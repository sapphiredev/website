import { createSeoProps } from '#config/next-seo.config';
import { getCurrentProjectTag } from '#contexts/ProjectCurrentTagContext';
import { updateProjectSelection } from '#contexts/ProjectSelectionContext';
import { updateProjectTags } from '#contexts/ProjectTagsContext';
import DocsLayout from '#presentational/Documentation/DocsLayout';
import { fetchBranchesAndTags, SapphireProject } from '#utils/gh-fetch';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DocumentationPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ selectableBranchesAndTags }) => {
	const router = useRouter();
	const setProjectTags = updateProjectTags();
	const setProjectSelection = updateProjectSelection();
	const currentProjectTag = getCurrentProjectTag();

	const [pkg, version, section, page] = router.query.page ?? [undefined, 'stable', 'getting-started', 'getting-started'];

	useEffect(() => {
		if (!pkg) {
			void router.replace(`${router.asPath}/framework/stable/getting-started/getting-started`);
		}
	}, [pkg, router]);

	useEffect(() => {
		setProjectTags(selectableBranchesAndTags);
		setProjectSelection((pkg as SapphireProject | undefined) ?? SapphireProject.Framework);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log('current tag:', currentProjectTag);
	}, [currentProjectTag]);

	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Documentation' })} />

			<DocsLayout branchesAndTags={selectableBranchesAndTags}>
				<div>Hello World Default!</div>
			</DocsLayout>
		</>
	);
};

export const getServerSideProps = async () => ({
	props: {
		selectableBranchesAndTags: await fetchBranchesAndTags(SapphireProject.Framework)
	}
});

declare module 'querystring' {
	interface ParsedUrlQuery {
		page?: string;
	}
}

export default DocumentationPage;
