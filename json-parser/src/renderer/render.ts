import type { ProjectParser } from 'typedoc-json-parser';
import { renderClasses } from './renderClass';
import { renderEnums } from './renderEnum';
import { renderFunctions } from './renderFunction';
import { renderInterfaces } from './renderInterface';
import { renderNamespaces } from './renderNamespace';
import { renderTypeAliases } from './renderTypeAlias';
import { renderVariables } from './renderVariable';

export function renderOutputFiles(projectParser: ProjectParser, outputDir: string, isGroup: boolean) {
	if (projectParser.classes.length) {
		renderClasses(projectParser.classes, projectParser, outputDir, isGroup);
	}

	if (projectParser.enums.length) {
		renderEnums(projectParser.enums, projectParser, outputDir, isGroup);
	}

	if (projectParser.functions.length) {
		renderFunctions(projectParser.functions, projectParser, outputDir, isGroup);
	}

	if (projectParser.interfaces.length) {
		renderInterfaces(projectParser.interfaces, projectParser, outputDir, isGroup);
	}

	if (projectParser.namespaces.length) {
		renderNamespaces(projectParser.namespaces, projectParser, outputDir, isGroup);
	}

	if (projectParser.typeAliases.length) {
		renderTypeAliases(projectParser.typeAliases, projectParser, outputDir, isGroup);
	}

	if (projectParser.variables.length) {
		renderVariables(projectParser.variables, projectParser, outputDir, isGroup);
	}
}
