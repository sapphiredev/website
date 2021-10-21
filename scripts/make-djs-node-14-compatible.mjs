import replace from 'replace-in-file';
import { fileURLToPath } from 'node:url';
import { sep } from 'node:path';

const discordJsSrcFolder = new URL('../node_modules/discord.js/src/', import.meta.url);

const options = {
	files: `${fileURLToPath(discordJsSrcFolder)}**${sep}*.js`,
	from: /([a-zA-Z].+) \?\?= (.+);/g,
	to: 'if ($1 === null || $1 === undefined) $1 = $2;'
};

await replace.replaceInFile(options);
