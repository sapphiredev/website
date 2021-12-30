import type { ProjectParser, TypeParameterParser } from 'typedoc-json-parser';

export function parseTypeParameters(typeParameters: TypeParameterParser[], projectParser: ProjectParser): string {
	if (!typeParameters.length) return '';

	return `| Name | Type | Default |
| :---: | :---: | :---: |
${typeParameters.map(
	(typeParameter) =>
		`| ${typeParameter.name} | ${
			typeParameter.constraint ? typeParameter.constraint.toString(projectParser).replace(/\|/g, '\\|') : 'Not provided.'
		} | ${typeParameter.default ? typeParameter.default.toString(projectParser).replace(/\|/g, '\\|') : 'Not provided.'}`
)}`;
}
