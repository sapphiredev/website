import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ProjectParser, TypeAliasParser } from 'typedoc-json-parser';
import { writeCategoryYaml } from './writeCategoryYaml';

export function renderTypeAliases(typeAliasParsers: TypeAliasParser[], projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (typeAliasParsers.every((typeAliasParser) => typeAliasParser.external)) return;

	const categoryDir = writeCategoryYaml(outputDir, 'type-alias', 'Type Aliases', isGroup ? 2 : 1);

	let fileSidebarPosition = 0;

	for (const typeAliasParser of typeAliasParsers) {
		if (typeAliasParser.external) return;

		renderTypeAlias(typeAliasParser, projectParser, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;
	}
}

function renderTypeAlias(typeAliasParser: TypeAliasParser, _projectParser: ProjectParser, outputDir: string, fileSidebarPosition: number) {
	const slug = typeAliasParser.name.toLowerCase().replace(/\s/g, '-');

	const header = `---
id: "${slug}"
title: "${typeAliasParser.name}"
sidebar_label: "${typeAliasParser.name}"
sidebar_position: ${fileSidebarPosition}
custom_edit_url: null
---`;

	const result = `${header}`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), result);
}
