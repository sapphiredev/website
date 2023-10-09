import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { VariableParser, ProjectParser } from 'typedoc-json-parser';
import { writeCategoryYaml } from './writeCategoryYaml';

export function renderVariables(variableParsers: VariableParser[], projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (variableParsers.every((variableParser) => variableParser.external)) return;

	const categoryDir = writeCategoryYaml(outputDir, 'variable', 'Variables', isGroup ? 2 : 1);

	let fileSidebarPosition = 0;

	for (const variableParser of variableParsers) {
		if (variableParser.external) continue;

		renderVariable(variableParser, projectParser, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;
	}
}

function renderVariable(constantParser: VariableParser, _projectParser: ProjectParser, outputDir: string, fileSidebarPosition: number) {
	const slug = constantParser.name.toLowerCase().replace(/\s/g, '-');

	const header = `---
id: "${slug}"
title: "${constantParser.name}"
sidebar_label: "${constantParser.name}"
sidebar_position: ${fileSidebarPosition}
custom_edit_url: null
---`;

	const result = `${header}`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), result);
}
