import type { ParameterParser, ProjectParser } from 'typedoc-json-parser';

export function parseParameters(parameters: ParameterParser[], projectParser: ProjectParser): string {
	if (!parameters.length) return '';

	return `| Name | Type | Description |
| :---: | :---: | :---: |
${parameters
	.map(
		(parameter) =>
			`| ${parameter.name} | ${parameter.type.toString(projectParser).replace(/\|/g, '\\|')} | ${
				parameter.comment.description ?? 'No description provided.'
			} |`
	)
	.join('\n')}`;
}
