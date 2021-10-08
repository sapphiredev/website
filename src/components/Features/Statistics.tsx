import useIsBrowser from '@docusaurus/useIsBrowser';
import { formatNumber } from '@site/src/utils/Intl';
import React, { FC, memo } from 'react';
import useSWR from 'swr';
import type { ContributorsData, NpmData, RepoData } from './Types';

const Statistics: FC = () => {
	const isBrowser = useIsBrowser();

	const { data: repoData } = useSWR<RepoData>('https://api.github.com/repos/sapphiredev/framework', {
		suspense: isBrowser
	});
	const { data: contributorsData } = useSWR<ContributorsData[]>('https://api.github.com/repos/sapphiredev/framework/contributors', {
		suspense: isBrowser
	});
	const { data: npmData } = useSWR<NpmData>('https://api.npmjs.org/downloads/range/2021-01-01:2100-12-31/@sapphire/framework', {
		suspense: isBrowser
	});

	return (
		<ul>
			{npmData && <li>{formatNumber(npmData.downloads.reduce((acc: number, curr) => (acc += curr.downloads), 0))}+ downloads</li>}
			{repoData && (
				<>
					<li>{formatNumber(repoData['stargazers_count'])}+ stars</li>
					<li>{formatNumber(repoData['forks_count'])}+ forks</li>
				</>
			)}
			{contributorsData && <li>{formatNumber(contributorsData.length)}+ contributors</li>}
		</ul>
	);
};

export default memo(Statistics);
