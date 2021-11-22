/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const npmToYarn = require('npm-to-yarn');
const npmToPnpm = require('./npm2pnpm');

const transformNode = (node, isSync) => {
	const groupIdProp = isSync ? 'groupId="npm2yarn2pnpm" ' : '';
	const npmCode = node.value;
	const yarnCode = npmToYarn(node.value, 'yarn');
	const pnpmCode = npmToPnpm(node.value);
	return [
		{
			type: 'jsx',
			value:
				`<Tabs defaultValue="npm" ${groupIdProp}` +
				`values={[
    { label: 'npm', value: 'npm', },
    { label: 'yarn', value: 'yarn', },
    { label: 'pnpm', value: 'pnpm', },
  ]}
>
<TabItem value="npm">`
		},
		{
			type: node.type,
			lang: node.lang,
			value: npmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="yarn">'
		},
		{
			type: node.type,
			lang: node.lang,
			value: yarnCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="pnpm">'
		},
		{
			type: node.type,
			lang: node.lang,
			value: pnpmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		}
	];
};

const matchNode = (node) => node.type === 'code' && typeof node.meta === 'string' && node.meta === 'npm2yarn2pnpm';
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
