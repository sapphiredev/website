import { sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import replace from 'replace-in-file';

const discordJsSrcFolder = new URL('../node_modules/discord.js/src/', import.meta.url);
const files = `${fileURLToPath(discordJsSrcFolder)}**${sep}*.js`;

const optionsLogicalNullish = {
	files,
	from: /([a-zA-Z].+) \?\?= (.+);/g,
	to: '$1 !== null && $1 !== void 0 ? $1 : ($1 = $2);'
};

const optionsLogicalAnd = {
	files,
	from: /([a-zA-Z].+) \&\&= (.+);/g,
	to: '$1 && ($1 = $2);'
};

const optionsLogicalOr = {
	files,
	from: /([a-zA-Z].+) \|\|= (.+);/g,
	to: '$1 || ($1 = $2);'
};

await replace.replaceInFile(optionsLogicalNullish);
await replace.replaceInFile(optionsLogicalAnd);
await replace.replaceInFile(optionsLogicalOr);
