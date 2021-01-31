import type { Branch, Tag } from '@config/types/gh-api-types';
import { fetchJson } from './util';

export enum SapphireProject {
	Framework = 'framework',
	Plugins = 'plugins',
	Utilities = 'utilities',
	Pieces = 'pieces'
}

export const fetchBranchesAndTags = async (project: SapphireProject) => {
	const [branches, tags] = await Promise.all<Branch[], Tag[]>([
		fetchJson(`https://api.github.com/repos/sapphire-project/${project}/branches`),
		fetchJson(`https://api.github.com/repos/sapphire-project/${project}/tags`)
	]);

	return [...branches.map((b) => b.name), ...tags.map((t) => t.name)].filter(
		(bt) => !(bt.toLowerCase().startsWith('build') || bt.toLowerCase().startsWith('gh-'))
	);
};

export const fetchDocsJson = async (project: SapphireProject, tag: string) => {
	return fetchJson(`https://raw.githubusercontent.com/sapphire-project/${project}/docs/${tag}.json`);
};
