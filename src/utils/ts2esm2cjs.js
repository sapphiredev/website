const { runTransform } = require('esm-to-cjs');
const ts = require('typescript');

/** @type {import('ts').CompilerOptions} */
const tsCompilerOptions = {
	module: ts.ModuleKind.ESNext,
	newLine: ts.NewLineKind.LineFeed,
	moduleResolution: ts.ModuleResolutionKind.NodeJs,
	target: ts.ScriptTarget.ESNext,
	removeComments: false,
	esModuleInterop: true,
	pretty: true
};

/**
 * Transpiles input TypeScript code to ESM code.
 * @param {string} code The code to transpile
 * @returns {{ outputText: string; diagnostics: unknown[]; sourceMapText?: string }} Input code transpiled to ESM
 */
const tsToEsm = (code) => ts.transpileModule(code, { reportDiagnostics: false, compilerOptions: tsCompilerOptions });

/**
 * Transforms input ESM code to CJS code.
 * @param {string} code The code to transform
 * @returns Input code transformed to CommonJS
 */
const esmToCjs = (code) => runTransform(code, { quote: 'single' });

/**
 * Transforms a Docusaurus node from TypeScript to ESM and CJS
 * @param {any} node The Docusaurus node to transform
 * @param {boolean} isSync Whether the transform should synchronize between all entries of this type
 * @returns The transformed node in the form of Tabs.
 */
const transformNode = (node, isSync) => {
	const groupIdProp = isSync ? 'groupId="ts2esm2cjs" ' : '';

	const esmCode = tsToEsm(node.value).outputText;
	const cjsCode = esmToCjs(esmCode);

	const [, jsHighlight, tsHighlight] = node.meta.split('|');

	return [
		{
			type: 'jsx',
			value:
				`<Tabs defaultValue="typescript" ${groupIdProp}` +
				`values={[
    { label: 'JavaScript', value: 'javascript', },
    { label: 'ESM', value: 'esm', },
    { label: 'TypeScript', value: 'typescript', },
  ]}
>
<TabItem value="javascript">`
		},
		{
			type: node.type,
			lang: node.lang,
			meta: jsHighlight,
			value: cjsCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="esm">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: jsHighlight,
			value: esmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="typescript">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: tsHighlight,
			value: node.value
		},
		{
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		}
	];
};

const matchNode = (node) => node.type === 'code' && typeof node.meta === 'string' && node.meta.startsWith('ts2esm2cjs');
const nodeForImport = {
	type: 'import',
	value: "import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

module.exports = ({ sync = true } = { sync: true }) => {
	let transformed = false;
	let alreadyImported = false;

	const transformer = (node) => {
		if (node.type === 'import' && node.value.includes('@theme/Tabs')) {
			alreadyImported = true;
		}

		if (matchNode(node)) {
			transformed = true;
			return transformNode(node, sync);
		}

		if (Array.isArray(node.children)) {
			let index = 0;
			while (index < node.children.length) {
				const result = transformer(node.children[index]);
				if (result) {
					node.children.splice(index, 1, ...result);
					index += result.length;
				} else {
					index += 1;
				}
			}
		}

		if (node.type === 'root' && transformed && !alreadyImported) {
			node.children.unshift(nodeForImport);
		}

		return null;
	};

	return transformer;
};
