import type { ProjectParser, SignatureParser } from 'typedoc-json-parser';
import { parseExamples } from './parseExamples';
import { parseParameters } from './parseParameters';
import { parseSee } from './parseSee';
import { parseTypeParameters } from './parseTypeParameters';

export function parseSignatures(signatures: SignatureParser[], projectParser: ProjectParser): string {
	if (!signatures.length) return '';

	return signatures.map((signature) => parseSignature(signature, projectParser)).join('\n\n');
}

function parseSignature(signature: SignatureParser, projectParser: ProjectParser): string {
	return `### ${signature.name}${
		signature.typeParameters.length ? `<${signature.typeParameters.map((typeParameter) => typeParameter.name).join(', ')}\\>` : ''
	}(${signature.parameters.map((parameter) => parameter.name).join(', ')}): ${signature.returnType.toString(projectParser)}

${signature.comment.description ?? 'No description provided.'}

${parseSee(signature.comment.see)}

${
	signature.comment.example.length
		? `#### Examples

${parseExamples(signature.comment.example)}`
		: ''
}

${
	signature.typeParameters.length
		? `#### Type Parameters

${parseTypeParameters(signature.typeParameters, projectParser)}`
		: ''
}

${
	signature.parameters.length
		? `#### Parameters

${parseParameters(signature.parameters, projectParser)}`
		: ''
}`;
}
