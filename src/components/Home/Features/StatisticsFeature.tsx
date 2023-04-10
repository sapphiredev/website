import BrowserOnly from '@docusaurus/BrowserOnly';
import LoadingSkeleton from '@site/src/components/Home/LoadingSkeleton';
import clsx from 'clsx';
import React, { Suspense, memo, type FC } from 'react';
import Statistics from './Statistics';

const StatisticsFeature: FC = () => (
	<div className={clsx('col col--4')}>
		<div className="text--left padding-horiz--md">
			<h3>Statistics</h3>
			<div>
				<BrowserOnly fallback={<LoadingSkeleton />}>
					{() => (
						<Suspense fallback={<LoadingSkeleton />}>
							<Statistics />
						</Suspense>
					)}
				</BrowserOnly>
			</div>
		</div>
	</div>
);

export default memo(StatisticsFeature);
