import type { CommentParser } from 'typedoc-json-parser';

export function parseExamples(blockTags: CommentParser.BlockTag[]): string {
	if (blockTags.length === 0) return '';

	// TODO: Change the replacement string with `'$1 ts2esm2cjs\n'` after ensuring that all Framework code is compatible
	return `${blockTags.map((blockTag) => blockTag.text.replace(/(```typescript)\n/g, '$1 \n'))}`;
}
