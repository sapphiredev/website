import theme from '@config/theme';
import type { DefaultSeoProps as DefaultSeoPropsType } from 'next-seo';
import type { AdditionalRobotsProps } from 'next-seo/lib/types';

export const BaseUrl = 'https://www.sapphirejs.dev';
export const DefaultSeoProps: DefaultSeoPropsType = {
	titleTemplate: 'Sapphire | %s',
	title: 'Home',
	description:
		'Sapphire is a next-gen Discord bot framework for developers of all skill levels to make the best JavaScript/TypeScript based bots possible.',
	canonical: BaseUrl,
	additionalMetaTags: [
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'keywords', content: 'discord, bot, framework, documentation, guide, sapphire' },
		{
			name: 'summary',
			content:
				'Sapphire is a next-gen Discord bot framework for developers of all skill levels to make the best JavaScript/TypeScript based bots possible.'
		},
		{ name: 'subject', content: 'Documentation website for Sapphire Community' },
		{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
		{ name: 'googlebot', content: 'index,follow' },
		{ name: 'author', content: `Sapphire Community, sapphireproject@vivaldi.com` },
		{ name: 'owner', content: `Sapphire Community, sapphireproject@vivaldi.com` },
		{ name: 'designer', content: `Sapphire Community, sapphireproject@vivaldi.com` },
		{ name: 'reply-to', content: 'sapphireproject@vivaldi.com' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ name: 'apple-mobile-web-app-title', content: 'Sapphire Website' },
		{ name: 'application-name', content: 'Sapphire' },
		{ name: 'msapplication-TileColor', content: theme.palette.primary.main },
		{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
		{ name: 'msapplication-config', content: '/browserconfig.xml' },
		{ name: 'theme-color', content: theme.palette.primary.main },
		{ name: 'revisit-after', content: '7 days' },
		{ property: 'og:email', content: 'sapphireproject@vivaldi.com' }
	],
	openGraph: {
		title: 'Sapphire Website',
		url: BaseUrl,
		images: [
			{
				url: `${BaseUrl}/icons/opengraph.png`,
				alt: 'OpenGraphImage',
				width: 1024,
				height: 512
			}
		],
		type: 'website',
		locale: 'en_US',
		site_name: 'Sapphire',
		profile: {
			firstName: 'Sapphire Community',
			username: 'Sapphire',
			gender: 'Unspecified'
		}
	},
	twitter: {
		handle: '@WolfgalVlad',
		site: '@WolfgalVlad',
		cardType: 'summary'
	}
};

export const robotBlockingPageProps: AdditionalRobotsProps = {
	nosnippet: true,
	notranslate: true,
	noimageindex: true,
	noarchive: true,
	maxSnippet: -1,
	maxImagePreview: 'none',
	maxVideoPreview: -1
};

export default DefaultSeoProps;
