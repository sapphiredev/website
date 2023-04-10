import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React, { memo, type FC } from 'react';
import styles from './HomePageHeader.module.css';
import InstallTabs from './InstallButton/InstallTabs';

const HomePageHeader: FC = () => {
	const { siteConfig } = useDocusaurusContext();

	return (
		<>
			<header className={clsx('hero', styles.heroBanner)}>
				<div className="container">
					<img src="/img/gem.svg" alt="Sapphire Logo" className={styles.logo}></img>
					<h1 className="hero__title">{siteConfig.title}</h1>
					<h2 className={styles.imagineAFramework}>Imagine a Framework</h2>
					<InstallTabs />
				</div>
			</header>
		</>
	);
};

export default memo(HomePageHeader);
