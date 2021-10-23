import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import { SWRConfig } from 'swr';
import HeadTags from '../components/Home/HeadTags';
import HomePageFeatures from '../components/Home/HomepageFeatures';
import HomePageHeader from '../components/Home/HomePageHeader';

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();

	return (
		<>
			<HeadTags />
			<Layout title="Home" description={siteConfig.tagline}>
				<SWRConfig
					value={{
						fetcher: (resource: string, init: RequestInit) => fetch(resource, init).then((res) => res.json())
					}}
				>
					<HomePageHeader />
					<main>
						<HomePageFeatures />
					</main>
				</SWRConfig>
			</Layout>
		</>
	);
}
