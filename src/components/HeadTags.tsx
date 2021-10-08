import Head from '@docusaurus/Head';
import React, { FC, memo } from 'react';
import { BaseUrl, Description, Email, Title } from '../utils/constants';

const HeadTags: FC = () => {
	return (
		<Head>
			<title>{Title}</title>
			<meta charSet="utf-8" />
			<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta httpEquiv="Expires" content="1y" />
			<meta httpEquiv="Pragma" content="1y" />
			<meta httpEquiv="Cache-Control" content="1y" />
			<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
			<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />
			<link rel="canonical" href={BaseUrl} />
			<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
			<link rel="icon" type="image/png" sizes="194x194" href="/icons/android-chrome-194x194.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#23529B" />
			<link rel="shortcut icon" href="/icons/favicon.ico" />
			<link rel="apple-touch-startup-image" href="/icons/apple-startup.png" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			<meta name="apple-mobile-web-app-title" content={Title} />
			<meta name="application-name" content={Title} />
			<meta name="audience" content="all" />
			<meta name="author" content={`Sapphire Community, ${Email}`} />
			<meta name="coverage" content="Worldwide" />
			<meta name="description" content={Description} />
			<meta name="designer" content={`Sapphire Community, ${Email}`} />
			<meta name="distribution" content="Global" />
			<meta name="googlebot" content="index,follow" />
			<meta name="HandheldFriendly" content="True" />
			<meta name="identifier-URL" content={BaseUrl} />
			<meta name="keywords" content="discord, bot, framework, documentation, guide, sapphire" />
			<meta name="msapplication-config" content="/browserconfig.xml" />
			<meta name="msapplication-TileColor" content="#23529B" />
			<meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
			<meta name="owner" content={`Sapphire Community, ${Email}`} />
			<meta name="rating" content="safe for kids" />
			<meta name="reply-to" content={Email} />
			<meta name="revisit-after" content="7 days" />
			<meta name="robots" content="archive,follow,imageindex,index,odp,snippet,translate" />
			<meta name="shortlink" content={BaseUrl} />
			<meta name="subject" content="Documentation website for Sapphire Projects" />
			<meta name="summary" content={Description} />
			<meta name="target" content="all" />
			<meta name="theme-color" content="#23529B" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content="@WolfgalVlad" />
			<meta name="twitter:site" content="@WolfgalVlad" />
			<meta name="url" content={BaseUrl} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta property="og:description" content={Description} />
			<meta property="og:email" content={Email} />
			<meta property="og:image:alt" content="OpenGraphImage" />
			<meta property="og:image:height" content="512" />
			<meta property="og:image:width" content="1024" />
			<meta property="og:image" content="https://www.sapphirejs.dev/icons/opengraph.png" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:site_name" content={Title} />
			<meta property="og:title" content={Title} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={BaseUrl} />
		</Head>
	);
};

export default memo(HeadTags);
