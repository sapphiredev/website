import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import { SWRConfig } from 'swr';
import HeadTags from '../components/HeadTags';
import HomePageFeatures from '../components/HomepageFeatures';
import HomePageHeader from '../components/HomePageHeader';
import { Description } from '../utils/constants';

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();

	return (
		<>
			<HeadTags />
			<Layout title={siteConfig.title} description={Description}>
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
