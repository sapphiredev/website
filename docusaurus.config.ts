import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { convertNpmToPackageManagers } from '@sapphire/docusaurus-plugin-npm2yarn2pnpm';
import { ts2esm2cjs } from '@sapphire/docusaurus-plugin-ts2esm2cjs';
import { themes } from 'prism-react-renderer';

const Description =
	'Sapphire is a next-gen Discord bot framework for developers of all skill levels to make the best JavaScript/TypeScript based bots possible.';
const BaseUrl = 'https://sapphirejs.dev';
const Email = 'contact@sapphirejs.dev';
const Title = 'Sapphire Framework';

const baseTypedocOptions = {
	/* typedoc */
	includeVersion: true,

	/* typedoc-plugin-markdown */
	fileExtension: '.md',
	excludeExternals: true,
	expandParameters: true,
	parametersFormat: 'table',
	enumMembersFormat: 'table',
	indexFormat: 'table'
};

const config: Config = {
	title: 'Sapphire',
	url: BaseUrl,
	baseUrl: '/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	onDuplicateRoutes: 'warn',
	favicon: 'favicon.ico',
	tagline: Description,
	organizationName: 'sapphiredev',
	projectName: 'framework',
	themes: [],
	markdown: {
		format: 'detect'
	},
	future: {
		experimental_faster: true
	},

	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},

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
				...baseTypedocOptions,
				id: 'framework',
				entryPoints: ['./projects/framework/src/index.ts'],
				tsconfig: './projects/framework/src/tsconfig.json',
				readme: './projects/framework/README.md',
				out: 'docs/Documentation/api-framework',
				plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				...baseTypedocOptions,
				id: 'Pieces',
				entryPoints: ['./projects/pieces/src/index.ts'],
				tsconfig: './projects/pieces/src/tsconfig.json',
				readme: './projects/pieces/README.md',
				out: 'docs/Documentation/api-pieces',
				plugin: ['typedoc-plugin-mdn-links']
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				...baseTypedocOptions,
				id: 'Utilities',
				entryPointStrategy: 'packages',
				entryPoints: ['./projects/utilities/packages/*'],
				exclude: [
					'./projects/utilities/packages/eslint-config',
					'./projects/utilities/packages/eslint-plugin-result',
					'./projects/utilities/packages/prettier-config',
					'./projects/utilities/packages/ts-config'
				],
				out: 'docs/Documentation/api-utilities',
				plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				...baseTypedocOptions,
				id: 'Plugins',
				entryPointStrategy: 'packages',
				entryPoints: ['./projects/plugins/packages/*'],
				out: 'docs/Documentation/api-plugins',
				plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				...baseTypedocOptions,
				id: 'Type',
				entryPoints: ['./projects/type/src/lib/index.ts'],
				tsconfig: './projects/type/src/tsconfig.json',
				readme: './projects/type/README.md',
				out: 'docs/Documentation/api-type',
				plugin: ['typedoc-plugin-mdn-links']
			}
		],
		[
			'docusaurus-plugin-typedoc',
			{
				...baseTypedocOptions,
				id: 'Shapeshift',
				entryPoints: ['./projects/shapeshift/src/index.ts'],
				tsconfig: './projects/shapeshift/src/tsconfig.json',
				readme: './projects/shapeshift/README.md',
				out: 'docs/Documentation/api-shapeshift',
				plugin: ['typedoc-plugin-mdn-links']
			}
		]
	],

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					editUrl: 'https://github.com/sapphiredev/website/edit/main/',
					remarkPlugins: [convertNpmToPackageManagers, ts2esm2cjs],
					showLastUpdateAuthor: true,
					showLastUpdateTime: true
				},
				blog: false,
				theme: {
					customCss: ['./src/css/custom.css', './src/css/tippy-discord.css']
				}
			} satisfies Preset.Options
		]
	],

	themeConfig: {
		image: 'https://www.sapphirejs.dev/icons/opengraph.png',
		colorMode: {
			defaultMode: 'dark',
			respectPrefersColorScheme: true
		},
		metadata: [
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
			{ name: 'apple-mobile-web-app-title', content: Title },
			{ name: 'application-name', content: Title },
			{ name: 'audience', content: 'all' },
			{ name: 'author', content: `Sapphire Community, ${Email}` },
			{ name: 'coverage', content: 'Worldwide' },
			{ name: 'description', content: Description },
			{ name: 'designer', content: `Sapphire Community, ${Email}` },
			{ name: 'distribution', content: 'Global' },
			{ name: 'googlebot', content: 'index,follow' },
			{ name: 'HandheldFriendly', content: 'True' },
			{ name: 'identifier-URL', content: BaseUrl },
			{ name: 'keywords', content: 'discord, bot, framework, documentation, guide, sapphire' },
			{ name: 'msapplication-config', content: '/browserconfig.xml' },
			{ name: 'msapplication-TileColor', content: '#23529B' },
			{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
			{ name: 'owner', content: `Sapphire Community, ${Email}` },
			{ name: 'rating', content: 'safe for kids' },
			{ name: 'reply-to', content: Email },
			{ name: 'revisit-after', content: '7 days' },
			{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
			{ name: 'shortlink', content: BaseUrl },
			{ name: 'subject', content: 'Documentation website for Sapphire Projects' },
			{ name: 'summary', content: Description },
			{ name: 'target', content: 'all' },
			{ name: 'theme-color', content: '#23529B' },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:creator', content: '@WolfgalVlad' },
			{ name: 'twitter:site', content: '@WolfgalVlad' },
			{ name: 'url', content: BaseUrl },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ property: 'og:description', content: Description },
			{ property: 'og:email', content: Email },
			{ property: 'og:image:alt', content: 'OpenGraphImage' },
			{ property: 'og:image:height', content: '512' },
			{ property: 'og:image:width', content: '1024' },
			{ property: 'og:locale', content: 'en_US' },
			{ property: 'og:site_name', content: Title },
			{ property: 'og:title', content: Title },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: BaseUrl }
		],
		navbar: {
			title: 'Sapphire',
			logo: {
				alt: 'Sapphire Logo',
				src: 'icons/gem.svg'
			},
			items: [
				{
					to: '/',
					label: 'Home',
					position: 'left',
					activeBaseRegex: '^/$'
				},
				{
					to: 'docs/General/Welcome',
					position: 'left',
					label: 'Documentation',
					activeBaseRegex: '^/docs/(General|Documentation)/.+$'
				},
				{
					to: 'docs/Guide/getting-started/getting-started-with-sapphire',
					position: 'left',
					label: 'Guide',
					activeBaseRegex: '^/docs/Guide/.+$'
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
				alt: 'Powered By Polypane',
				src: 'icons/powered-by-polypane.svg'
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
				},
				{
					title: 'Our Sponsors',
					items: [
						{
							label: 'Polypane',
							href: 'https://polypane.app'
						}
					]
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} The Sapphire Community and its contributors.`
		},
		prism: {
			defaultLanguage: 'javascript',
			additionalLanguages: ['powershell', 'batch'],
			theme: themes.github,
			darkTheme: themes.vsDark
		},
		algolia: {
			appId: 'WWVT30WAIZ',
			apiKey: 'c1639f17b4ed5183d032d2e7f22ec62f',
			indexName: 'sapphirejs',
			contextualSearch: false
		}
	} satisfies Preset.ThemeConfig
};

export default config;
