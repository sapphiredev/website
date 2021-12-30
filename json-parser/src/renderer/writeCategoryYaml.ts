import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ensureDirectory } from './utilities/ensureDirectory';

export function writeCategoryYaml(directory: string, categoryPath: string, categoryName: string, sidebarPosition: number) {
	const categoryDirectory = resolve(directory, categoryPath);

	ensureDirectory(categoryDirectory);

	const categoryData = [`label: "${categoryName}"`, `position: ${sidebarPosition}`].join(`\n`);

	writeFileSync(resolve(categoryDirectory, '_category.yml'), categoryData);

	return categoryDirectory;
}
