const sapphirePrettierConfig = require('@sapphire/prettier-config');

module.exports = {
	...sapphirePrettierConfig,
	overrides: [
		...sapphirePrettierConfig.overrides,
		{
			files: ['docs/Guide/**/*.mdx', 'docs/Guide/**/*.md', 'docs/General/**/*.mdx', 'docs/General/**/*.md'],
			options: {
				tabWidth: 2,
				useTabs: false,
				printWidth: 120
			}
		}
	]
};
