import { rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const projectsDir = new URL('../projects/', import.meta.url);
const backupDir = new URL('backup/', import.meta.url);

const paths = ['cli', 'framework', 'pieces', 'plugins', 'type', 'utilities'];

await Promise.all(
	paths.map((id) => {
		const oldFile = new URL(`${id}-yarn.lock`, backupDir);
		const newFile = new URL(`${id}/yarn.lock`, projectsDir);

		if (existsSync(oldFile)) {
			return rename(oldFile, newFile);
		}

		return null;
	})
);
