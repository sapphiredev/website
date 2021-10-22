import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import React, { FC, memo, Suspense } from 'react';
import LoadingSkeleton from '../LoadingSkeleton';
import Statistics from './Statistics';

const StatisticsFeature: FC = () => (
	<div className={clsx('col col--4')}>
		<div className="text--left padding-horiz--md">
			<h3>Statistics</h3>
			<p>
				<BrowserOnly fallback={<LoadingSkeleton />}>
					{() => (
						<Suspense fallback={<LoadingSkeleton />}>
							<Statistics />
						</Suspense>
					)}
				</BrowserOnly>
			</p>
		</div>
	</div>
);

export default memo(StatisticsFeature);
