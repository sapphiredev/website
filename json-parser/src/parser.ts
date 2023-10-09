import { fetch } from '@sapphire/fetch';
import { blue, bold, yellow } from 'colorette';
import { resolve } from 'node:path';
import { URLSearchParams, fileURLToPath } from 'node:url';
import {
	ClassParser,
	EnumParser,
	FunctionParser,
	InterfaceParser,
	NamespaceParser,
	ProjectParser,
	ReferenceTypeParser,
	TypeAliasParser,
	VariableParser,
	type SearchResult,
	TypeParameterParser
} from 'typedoc-json-parser';
import { renderOutputFiles } from './renderer/render';
import { removeDirectory } from './renderer/utilities/removeDirectory';
import { writeCategoryYaml } from './renderer/writeCategoryYaml';
import type { PluginOptions } from './types/PluginOptions';
import { RepositoryContentFileType, type RepositoryContent } from './types/RepositoryContent';

const neighbourProjects = new Map<string, [string | null, ProjectParser[]]>();

const references: Record<string, string> = {
	// MDN
	BigInt64Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array',
	Blob: 'https://developer.mozilla.org/en-US/docs/Web/API/Blob',
	Date: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
	_DOMEventTarget: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget',
	Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
	Float32Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array',
	Float64Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array',
	Function: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
	Int16Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array',
	Int32Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array',
	Int8Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array',
	Iterable: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol',
	Iterator: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol',
	Map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
	Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
	RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
	Response: 'https://developer.mozilla.org/en-US/docs/Web/API/Response',
	Set: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
	URL: 'https://developer.mozilla.org/en-US/docs/Web/API/URL',

	// Node.js
	'global.Buffer': 'https://nodejs.org/api/buffer.html',
	'__global.Buffer': 'https://nodejs.org/api/buffer.html',
	EventEmitter: 'https://nodejs.org/api/events.html#events_class_eventemitter',
	'global.NodeJS.EventEmitter': 'https://nodejs.org/api/events.html#events_class_eventemitter',
	'__global.NodeJS.EventEmitter': 'https://nodejs.org/api/events.html#events_class_eventemitter',
	'EventEmitter.captureRejectionSymbol': 'https://nodejs.org/api/events.html#eventscapturerejectionsymbol',
	'EventEmitter.errorMonitor': 'https://nodejs.org/api/events.html#eventserrormonitor',
	NodeEventTarget: 'https://nodejs.org/api/events.html#class-nodeeventtarget',
	PathLike: 'https://nodejs.org/api/path.html#path_pathlike',
	'"fs".PathLike': 'https://nodejs.org/api/path.html#path_pathlike',
	'global.NodeJS.Timeout': 'https://nodejs.org/api/timers.html#timers_class_timeout',
	'__global.NodeJS.Timeout': 'https://nodejs.org/api/timers.html#timers_class_timeout',
	'global.NodeJS.Timer': 'https://nodejs.org/api/timers.html#timers_class_timeout',
	'__global.NodeJS.Timer': 'https://nodejs.org/api/timers.html#timers_class_timeout',
	'internal.Stream': 'https://nodejs.org/api/stream.html#stream_class_stream',

	// TypeScript
	Exclude: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers',
	InstanceType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetype',
	Omit: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
	Partial: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
	Readonly: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
	Record: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type'
};

const unknownReferences: Set<string> = new Set([
	// 'typescript'
	'ArrayLike',
	'AsyncIterableIterator',
	'ClassDecorator',
	'DOMEventTarget',
	'InspectOptionsStylized',
	'IterableIterator',
	'IteratorResult',
	'MapConstructor',
	'MethodDecorator',
	'PropertyKey',
	'ObjectConstructor',
	'ReadonlyMap',

	// '@types/node'
	'StaticEventEmitterOptions'
]);

ReferenceTypeParser.formatToString = (options) => {
	const { parser, project } = options;
	const typeArguments =
		parser.typeArguments.length > 0
			? `<${parser.typeArguments.map((type) => (project ? type.toString(project) : type.toString())).join(', ')}\\>`
			: '';

	if (parser.id && parser.id > 0 && project) {
		const result = project.find(parser.id) ?? project.search(parser.name)[0];

		if (result) {
			if (result instanceof TypeParameterParser) return `\`${parser.name}\`${typeArguments}`;

			if ('external' in result && !result.external) {
				const parents = recursivelyGetNamespaceParents(result, project);

				if (result instanceof NamespaceParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/namespace/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof ClassParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/class/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof FunctionParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/function/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof InterfaceParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/interface/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof EnumParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/enum/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof TypeAliasParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/type/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				} else if (result instanceof VariableParser) {
					return `[\`${parser.name}\`](../${parents
						.reverse()
						.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
						.join('/')}/variable/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
				}
			}
		} else {
			console.warn(yellow(`${bold('[WARN]')} Unable to find parser for ${parser.name} (${parser.id})`));
		}
	}

	if (parser.packageName) {
		if (parser.packageName === 'discord.js') {
			return `[\`${parser.name}\`](https://discord.js.org/#/docs/discord.js/main/search?${new URLSearchParams({
				query: parser.name
			})})${typeArguments}`;
		} else if (parser.packageName === '@discordjs/collection') {
			return `[\`${parser.name}\`](https://discord.js.org/#/docs/collection/main/search?${new URLSearchParams({
				query: parser.name
			})})${typeArguments}`;
		} else if (parser.packageName.startsWith('@sapphire/')) {
			const filteredNeighbourProjects: [string | null, ProjectParser][] = [...neighbourProjects]
				.filter(([name]) => parser.packageName === name)
				.map(([, [group, projectParsers]]) => {
					if (projectParsers.length === 1) return [group, projectParsers[0]];

					const [latestVersion] = findLatestVersions(projectParsers.map((projectParser) => projectParser.version!));

					return [group, projectParsers.find((projectParser) => projectParser.version === latestVersion)!];
				});

			const [group, neighbourProject] = filteredNeighbourProjects.find(
				([, neighbourProject]) => neighbourProject.name === parser.packageName
			) ?? [null, null];

			if (neighbourProject) {
				const [result] = neighbourProject.search(parser.name);

				if (result) {
					const parents = recursivelyGetNamespaceParents(result, neighbourProject);

					if (result instanceof NamespaceParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/namespace/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof ClassParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/class/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof FunctionParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/function/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof InterfaceParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/interface/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof EnumParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/enum/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof TypeAliasParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/type/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					} else if (result instanceof VariableParser) {
						return `[\`${parser.name}\`](../../../${group ? `${group}/` : ''}${parser.packageName.replace('@sapphire/', '')}/${
							neighbourProject.version
						}${parents
							.reverse()
							.map((parent) => `namespace/${parent.name.toLowerCase().replace(/\s/g, '-')}/`)
							.join('/')}/variable/${parser.name.toLowerCase().replace(/\s/g, '-')}.mdx)${typeArguments}`;
					}
				}
			}
		}

		for (const [ref, url] of Object.entries(references)) {
			if (ref === parser.name) return `[\`${parser.name}\`](${url})${typeArguments}`;
		}

		if (!unknownReferences.has(parser.name)) {
			console.warn(yellow(`${bold('[WARN]')} Unable to find parser for ${parser.name} (${parser.packageName})`));
		}

		return `[\`${parser.name}\`](package::${parser.packageName})${typeArguments}`;
	}

	return `\`${parser.name}\`${typeArguments}`;
};

export async function docusaurusTypeDocJsonParser(options: PluginOptions) {
	const siteDir = fileURLToPath(new URL('../../', import.meta.url));
	const { githubContentUrl, githubToken } = options;

	const headers = new Headers();

	if (githubToken) headers.append('Authorization', `Bearer ${githubToken}`);

	console.info(blue(`${bold('[INFO]')} Fetching repository content... ${bold(githubContentUrl)}`));

	const repositoryContents = await fetch<RepositoryContent[]>(githubContentUrl, { headers });
	const repositoryDirectories = repositoryContents.filter((content) => content.type === RepositoryContentFileType.Directory);

	const parsed = new Map<string, [string, ProjectParser[], boolean]>();

	for (const directory of repositoryDirectories) {
		console.info(blue(`${bold('[INFO]')} Fetching repository content... ${bold(directory.url)}`));

		const directoryContents = await fetch<RepositoryContent[]>(directory.url, { headers });
		const latestVersions = findLatestVersions(
			directoryContents
				.filter((directoryContent) => directoryContent.name !== 'main.json')
				.map((directoryContent) => directoryContent.name.replace('.json', '').replace('v', ''))
		);

		for (const directoryContent of directoryContents) {
			if (directoryContent.type === RepositoryContentFileType.Directory) {
				const subDirectoryContents = await fetch<RepositoryContent[]>(directoryContent.url, { headers });

				writeCategoryYaml(resolve(siteDir, 'docs', 'Documentation', directory.name), '', directory.name, 0);

				const latestVersions = findLatestVersions(
					subDirectoryContents
						.filter((subDirectoryContent) => subDirectoryContent.name !== 'main.json')
						.map((subDirectoryContent) => subDirectoryContent.name.replace('.json', '').replace('v', ''))
				);
				const filteredSubDirectoryContents = subDirectoryContents.filter((subDirectoryContent) =>
					[...latestVersions, 'main'].includes(subDirectoryContent.name.replace('.json', '').replace('v', ''))
				);

				for (const subDirectoryContent of filteredSubDirectoryContents) {
					if (subDirectoryContent.download_url === null)
						throw new Error(
							`The 'download_url' field is null for '${directory.name}/${directoryContent.name}/${subDirectoryContent.name}'`
						);

					writeCategoryYaml(resolve(siteDir, 'docs', 'Documentation', directory.name, directoryContent.name), '', directoryContent.name, 1);

					const outputDir = resolve(
						siteDir,
						'docs',
						'Documentation',
						directory.name,
						directoryContent.name,
						subDirectoryContent.name.replace('.json', '')
					);

					removeDirectory(outputDir);

					writeCategoryYaml(outputDir, '', subDirectoryContent.name.replace('.json', ''), 1);

					const data = await fetch<ProjectParser.Json>(subDirectoryContent.download_url);
					const incomingTypeDocJsonParserVersion = data.typeDocJsonParserVersion.split('.').map(Number) as [number, number, number];
					const currentTypeDocJsonParserVersion = ProjectParser.version.split('.').map(Number) as [number, number, number];

					if (incomingTypeDocJsonParserVersion[0] !== currentTypeDocJsonParserVersion[0]) continue;

					const projectParser = new ProjectParser({ data, version: subDirectoryContent.name.replace('.json', '') });

					if (directoryContents.length > 1 && subDirectoryContent.name !== 'main.json') {
						neighbourProjects.set(projectParser.name, [directoryContent.name, [projectParser]]);
					} else {
						if (neighbourProjects.has(projectParser.name)) {
							const [, neighbourProject] = neighbourProjects.get(projectParser.name)!;

							neighbourProject.push(projectParser);
							neighbourProjects.set(projectParser.name, [directoryContent.name, neighbourProject]);
						}

						neighbourProjects.set(projectParser.name, [directoryContent.name, [projectParser]]);
					}

					if (parsed.has(projectParser.name)) {
						const [, existingProjectParsers] = parsed.get(projectParser.name)!;

						existingProjectParsers.push(projectParser);
					}

					parsed.set(projectParser.name, [outputDir, [projectParser], true]);
				}
			} else {
				if (directoryContent.download_url === null)
					throw new Error(`The 'download_url' field is null for '${directory.name}/${directoryContent.name}'`);

				if (![...latestVersions, 'main'].includes(directoryContent.name.replace('.json', '').replace('v', ''))) continue;

				writeCategoryYaml(resolve(siteDir, 'docs', 'Documentation', directory.name), '', directory.name, 0);

				const outputDir = resolve(siteDir, 'docs', 'Documentation', directory.name, directoryContent.name.replace('.json', ''));

				removeDirectory(outputDir);

				writeCategoryYaml(outputDir, '', directoryContent.name.replace('.json', ''), 1);

				const data = await fetch<ProjectParser.Json>(directoryContent.download_url);
				const incomingTypeDocJsonParserVersion = data.typeDocJsonParserVersion.split('.').map(Number) as [number, number, number];
				const currentTypeDocJsonParserVersion = ProjectParser.version.split('.').map(Number) as [number, number, number];

				if (incomingTypeDocJsonParserVersion[0] !== currentTypeDocJsonParserVersion[0]) continue;

				const projectParser = new ProjectParser({ data, version: directoryContent.name.replace('.json', '') });

				if (directoryContents.length > 1 && directoryContent.name !== 'main.json') {
					neighbourProjects.set(projectParser.name, [null, [projectParser]]);
				} else {
					if (neighbourProjects.has(projectParser.name)) {
						const [, neighbourProject] = neighbourProjects.get(projectParser.name)!;

						neighbourProject.push(projectParser);
						neighbourProjects.set(projectParser.name, [null, neighbourProject]);
					}

					neighbourProjects.set(projectParser.name, [null, [projectParser]]);
				}

				if (parsed.has(projectParser.name)) {
					const [, existingProjectParsers] = parsed.get(projectParser.name)!;

					existingProjectParsers.push(projectParser);
					parsed.set(projectParser.name, [outputDir, existingProjectParsers, false]);
				}

				parsed.set(projectParser.name, [outputDir, [projectParser], false]);
			}
		}
	}

	for (const [outputDir, projectParsers, isGroup] of parsed.values()) {
		for (const projectParser of projectParsers) {
			renderOutputFiles(projectParser, outputDir, isGroup);
		}
	}
}

function getNamespaceParent(result: SearchResult, project: ProjectParser): NamespaceParser | null {
	return 'namespaceParentId' in result && result.namespaceParentId ? (project.find(result.namespaceParentId) as NamespaceParser | null) : null;
}

function recursivelyGetNamespaceParents(result: SearchResult, project: ProjectParser): NamespaceParser[] {
	const parents: NamespaceParser[] = [];
	let parent = getNamespaceParent(result, project);

	while (parent) {
		parents.push(parent);
		parent = getNamespaceParent(parent, project);
	}

	return parents;
}

function findLatestVersions(versions: string[]): string[] {
	const latestVersions = new Map<number, string>();

	for (const version of versions) {
		const [major, minor, patch] = version.split('.').map(Number);
		const latest = latestVersions.get(major);

		if (!latest || minor > Number(latest.split('.')[1]) || (minor === Number(latest.split('.')[1]) && patch > Number(latest.split('.')[2]))) {
			latestVersions.set(major, `${major}.${minor}.${patch}`);
		}
	}

	return [...latestVersions.values()];
}
