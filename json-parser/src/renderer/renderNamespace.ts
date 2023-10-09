import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { NamespaceParser, ProjectParser } from 'typedoc-json-parser';
import { writeCategoryYaml } from './writeCategoryYaml';
import { renderClasses } from './renderClass';
import { renderEnums } from './renderEnum';
import { renderFunctions } from './renderFunction';
import { renderInterfaces } from './renderInterface';
import { renderVariables } from './renderVariable';
import { renderTypeAliases } from './renderTypeAlias';

export function renderNamespaces(namespaceParsers: NamespaceParser[], projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (namespaceParsers.every((namespaceParser) => namespaceParser.external)) return;

	const categoryDir = writeCategoryYaml(outputDir, 'namespace', 'Namespaces', isGroup ? 2 : 1);

	let fileSidebarPosition = 0;

	for (const namespaceParser of namespaceParsers) {
		if (namespaceParser.external) continue;

		renderNamespace(namespaceParser, projectParser, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;

		if (namespaceParser.classes.length) {
			if (!namespaceParser.classes.every((classParser) => classParser.external)) {
				renderClasses(namespaceParser.classes, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.enums.length) {
			if (!namespaceParser.enums.every((enumParser) => enumParser.external)) {
				renderEnums(namespaceParser.enums, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.functions.length) {
			if (!namespaceParser.functions.every((functionParser) => functionParser.external)) {
				renderFunctions(namespaceParser.functions, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.interfaces.length) {
			if (!namespaceParser.interfaces.every((interfaceParser) => interfaceParser.external)) {
				renderInterfaces(namespaceParser.interfaces, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.namespaces.length) {
			if (!namespaceParser.namespaces.every((namespaceParser) => namespaceParser.external)) {
				renderNamespaces(namespaceParser.namespaces, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.typeAliases.length) {
			if (!namespaceParser.typeAliases.every((typeAliasParser) => typeAliasParser.external)) {
				renderTypeAliases(namespaceParser.typeAliases, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}

		if (namespaceParser.variables.length) {
			if (!namespaceParser.variables.every((variableParser) => variableParser.external)) {
				renderVariables(namespaceParser.variables, projectParser, categoryDir, isGroup);

				fileSidebarPosition++;
			}
		}
	}
}

function renderNamespace(namespaceParser: NamespaceParser, _projectParser: ProjectParser, outputDir: string, fileSidebarPosition: number) {
	const slug = namespaceParser.name.toLowerCase().replace(/\s/g, '-');

	const header = `---
id: "${slug}"
title: "${namespaceParser.name}"
sidebar_label: "${namespaceParser.name}"
sidebar_position: ${fileSidebarPosition}
custom_edit_url: null
---`;

	const result = `${header}`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), result);
}
