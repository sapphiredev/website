import clsx from 'clsx';
import React, { FC, memo } from 'react';
import type { FeatureItem } from './Types';

const Feature: FC<FeatureItem> = ({ title, description }) => (
	<div className={clsx('col col--4')}>
		<div className="text--left padding-horiz--md">
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	</div>
);

export default memo(Feature);
