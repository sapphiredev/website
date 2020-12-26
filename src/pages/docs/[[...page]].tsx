import { createSeoProps } from '#config/next-seo.config';
import GeneralPage from '#layout/General';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const DocumentationPage: NextPage = () => {
	const router = useRouter();

	const [pkg, version, section, page] = router.query.page ?? [undefined, 'stable', 'getting-started', 'getting-started'];

	console.table({
		package: pkg,
		version,
		section,
		page
	});

	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Documentation' })} />
			<GeneralPage>
				<div>Hello World Default!</div>
			</GeneralPage>
		</>
	);
};

declare module 'querystring' {
	interface ParsedUrlQuery {
		page?: string;
	}
}

export default DocumentationPage;
