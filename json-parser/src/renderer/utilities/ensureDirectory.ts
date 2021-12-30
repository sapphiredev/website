import { existsSync, mkdirSync } from 'node:fs';

export function ensureDirectory(dir: string) {
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}
