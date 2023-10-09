import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { EnumMemberParser, EnumParser, ProjectParser } from 'typedoc-json-parser';
import { parseExamples } from './utilities/parseExamples';
import { parseSee } from './utilities/parseSee';
import { writeCategoryYaml } from './writeCategoryYaml';

export function renderEnums(enumParsers: EnumParser[], projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (enumParsers.every((enumParser) => enumParser.external)) return;

	const categoryDir = writeCategoryYaml(outputDir, 'enum', 'Enums', isGroup ? 2 : 1);

	let fileSidebarPosition = 0;

	for (const enumParser of enumParsers) {
		if (enumParser.external) continue;

		renderEnum(enumParser, projectParser, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;
	}
}

function renderEnum(enumParser: EnumParser, _projectParser: ProjectParser, outputDir: string, fileSidebarPosition: number) {
	const slug = enumParser.name.toLowerCase().replace(/\s/g, '-');

	const header = `---
id: "${slug}"
title: "${enumParser.name}"
sidebar_label: "${enumParser.name}"
sidebar_position: ${fileSidebarPosition}
custom_edit_url: null
---`;

	const result = `${header}

${enumParser.comment.description ?? 'No description provided.'}

${parseSee(enumParser.comment.see)}

${
	enumParser.comment.example.length
		? `## Examples

${parseExamples(enumParser.comment.example)}`
		: ''
}

${parseMembers(enumParser.members)}
`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), result);
}

function parseMembers(members: EnumMemberParser[]): string {
	if (!members.length) return '';

	return `## Members

${members
	.map(
		(member) => `### ${member.name} = ${isNaN(Number(member.value)) ? `"${member.value}"` : member.value}

${member.comment.description ?? 'No description provided.'}

${parseSee(member.comment.see)}

${
	member.comment.example.length
		? `#### Examples

${parseExamples(member.comment.example)}`
		: ''
}`
	)
	.join('\n\n')}`;
}
