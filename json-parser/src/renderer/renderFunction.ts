import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { FunctionParser, ProjectParser } from 'typedoc-json-parser';
import { parseSignatures } from './utilities/parseSignatures';
import { writeCategoryYaml } from './writeCategoryYaml';

export function renderFunctions(functionParsers: FunctionParser[], projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (functionParsers.every((functionParser) => functionParser.external)) return;

	const categoryDir = writeCategoryYaml(outputDir, 'function', 'Functions', isGroup ? 2 : 1);

	let fileSidebarPosition = 0;

	for (const functionParser of functionParsers) {
		if (functionParser.external) continue;

		renderFunction(functionParser, projectParser, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;
	}
}

function renderFunction(functionParser: FunctionParser, projectParser: ProjectParser, outputDir: string, fileSidebarPosition: number) {
	const slug = functionParser.name.toLowerCase().replace(/\s/g, '-');

	const header = `---
id: "${slug}"
title: "${functionParser.name}"
sidebar_label: "${functionParser.name}"
sidebar_position: ${fileSidebarPosition}
custom_edit_url: null
---`;

	const result = `${header}

${functionParser.signatures.length > 1 ? `## Signatures` : ''}

${parseSignatures(functionParser.signatures, projectParser)}`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), result);
}
