/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Link from '@docusaurus/Link';
import type { FC } from 'react';
import Feature from './Features/Feature';
import StatisticsFeature from './Features/StatisticsFeature';
import type { FeatureItem } from './Features/Types';
import styles from './HomepageFeatures.module.css';

const FeatureList: FeatureItem[] = [
	{
		title: 'About',
		description: (
			<>
				Sapphire is a next-gen object-oriented <Link to="https://discord.js.org">Discord.js</Link> bot framework.
				<br />
				<br />
				Sapphire is a community driven framework that aims to give you all the features you need to make your Discord bot.
				<br />
				<br />
				With a history of many other Discord bot frameworks (both for NodeJS and other languages) to inspire Sapphire, it has become the
				ultimate modern experience of writing your code.
			</>
		)
	},
	{
		title: 'Key Features',
		description: (
			<>
				<ul>
					<li>Advanced plugin support</li>
					<li>Supports both CommonJS and ESM</li>
					<li>Completely modular and extendable</li>
					<li>Designed with first class TypeScript support in mind</li>
					<li>Includes optional utilities that you can use in any project</li>
				</ul>
			</>
		)
	}
];

const HomePageFeatures: FC = () => (
	<section className={styles.features}>
		<div className="container">
			<div className="row">
				{FeatureList.map((props, idx) => (
					<Feature key={idx} {...props} />
				))}
				<StatisticsFeature />
			</div>
		</div>
	</section>
);

export default HomePageFeatures;
