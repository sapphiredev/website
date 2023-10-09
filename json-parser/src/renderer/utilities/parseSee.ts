import type { CommentParser } from 'typedoc-json-parser';

export function parseSee(blockTags: CommentParser.BlockTag[]): string {
	if (blockTags.length === 0) return '';

	return blockTags.map((blockTag) => `\n**See Also:** ${blockTag.text}`).join('\n');
}
