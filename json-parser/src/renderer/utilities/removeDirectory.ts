import { existsSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'node:fs';

export function removeDirectory(directory: string) {
	if (existsSync(directory)) {
		const files = readdirSync(directory);

		if (files.length > 0) {
			files.forEach((filename) => {
				if (statSync(`${directory}/${filename}`).isDirectory()) {
					removeDirectory(`${directory}/${filename}`);
				} else {
					unlinkSync(`${directory}/${filename}`);
				}
			});

			rmdirSync(directory);
		} else {
			rmdirSync(directory);
		}
	}
}
