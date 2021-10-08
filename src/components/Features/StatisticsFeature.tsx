import useIsBrowser from '@docusaurus/useIsBrowser';
import clsx from 'clsx';
import React, { FC, memo, Suspense } from 'react';
import LoadingSkeleton from '../LoadingSkeleton';
import Statistics from './Statistics';

const StatisticsFeature: FC = () => {
	const isBrowser = useIsBrowser();

	return (
		<div className={clsx('col col--4')}>
			<div className="text--left padding-horiz--md">
				<h3>Statistics</h3>
				<p>
					{isBrowser ? (
						<Suspense fallback={<LoadingSkeleton />}>
							<Statistics />
						</Suspense>
					) : (
						<Statistics />
					)}
				</p>
			</div>
		</div>
	);
};

export default memo(StatisticsFeature);
