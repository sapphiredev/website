const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {Partial<import('@docusaurus/types').DocusaurusConfig>} */
const config = {
	title: 'Sapphire',
	url: 'https://sapphirejs.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	onDuplicateRoutes: 'throw',
	favicon: 'img/favicon.ico',
	tagline: 'Sapphire is a next-gen Discord bot framework for developers of all skill levels to make the best JavaScript/TypeScript based bots possible.',
	organizationName: 'sapphiredev',
	projectName: 'framework',

	themes: [],

	plugins: [
		[
			'@docusaurus/plugin-pwa',
			{
				offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/icons/android-chrome-192x192.png'
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.webmanifest'
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: '#23529B'
					}
				]
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				id: 'framework',
				entryPoints: ['./projects/framework/src/index.ts'],
				tsconfig: './projects/framework/src/tsconfig.json',
				readme: 'none',
				out: 'Documentation/api-framework',
				sidebar: {
					categoryLabel: '@sapphire/framework',
					position: 0,
					fullNames: true
				}
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				id: 'Pieces',
				entryPoints: ['./projects/pieces/src/index.ts'],
				tsconfig: './projects/pieces/src/tsconfig.json',
				readme: 'none',
				out: 'Documentation/api-pieces',
				sidebar: {
					categoryLabel: '@sapphire/pieces',
					position: 1,
					fullNames: true
				}
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				id: 'Utilities',
				entryPoints: ['./projects/utilities/'],
				entryPointStrategy: 'packages',
				tsconfig: './projects/utilities/tsconfig.dev.json',
				readme: 'none',
				out: 'Documentation/api-utilities',
				sidebar: {
					categoryLabel: 'Sapphire Utilities',
					position: 2
				}
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				id: 'Plugins',
				entryPoints: ['./projects/plugins/'],
				entryPointStrategy: 'packages',
				tsconfig: './projects/plugins/tsconfig.base.json',
				readme: 'none',
				out: 'Documentation/api-plugins',
				sidebar: {
					categoryLabel: 'Sapphire Plugins',
					position: 3
				}
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				id: 'Type',
				entryPoints: ['./projects/type/src/index.ts'],
				tsconfig: './projects/type/src/tsconfig.json',
				readme: './projects/type/README.md',
				out: 'Documentation/api-type',
				sidebar: {
					categoryLabel: '@sapphire/type',
					position: 4,
					fullNames: true
				}
			}
		]
	],

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/sapphiredev/website/edit/main/'
				},
				theme: {
					customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/tippy-discord.css')]
				}
			})
		]
	],

	themeConfig:
		/** @type {Partial<import('@docusaurus/preset-classic').ThemeConfig>} */
		({
			navbar: {
				title: 'Sapphire',
				logo: {
					alt: 'Sapphire Logo',
					src: 'img/gem.svg'
				},
				items: [
					{
						to: '/',
						label: 'Home',
						position: 'left',
						activeBaseRegex: '^/$'
					},
					{
						type: 'doc',
						docId: 'General/Welcome',
						position: 'left',
						label: 'Documentation'
					},
					{
						href: 'https://sapphirejs.dev/discord',
						label: 'Discord',
						position: 'right'
					},
					{
						href: 'https://github.com/sapphiredev',
						label: 'GitHub',
						position: 'right'
					}
				]
			},
			footer: {
				style: 'dark',
				logo: {
					alt: 'Powered By Vercel',
					src: 'img/powered-by-vercel.svg',
					href: 'https://vercel.com/?utm_source=sapphiredev&utm_campaign=oss'
				},
				links: [
					{
						title: 'Donate',
						items: [
							{
								label: 'Ko-fi',
								href: 'https://sapphirejs.dev/kofi'
							},
							{
								label: 'PayPal',
								href: 'https://sapphirejs.dev/paypal'
							},
							{
								label: 'Patreon',
								href: 'https://sapphirejs.dev/patreon'
							},
							{
								label: 'Open Collective',
								href: 'https://sapphirejs.dev/opencollective'
							}
						]
					},
					{
						title: 'Our Platforms',
						items: [
							{
								label: 'Discord Server',
								href: 'https://sapphirejs.dev/discord'
							},
							{
								label: 'NPM Organization',
								href: 'https://www.npmjs.com/org/sapphire'
							},
							{
								label: 'GitHub Organization',
								href: 'https://github.com/sapphiredev'
							}
						]
					}
				],
				copyright: `Copyright © ${new Date().getFullYear()} The Sapphire Community and its contributors.`
			},
			prism: {
				defaultLanguage: 'javascript',
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			}
		})
};

module.exports = config;
