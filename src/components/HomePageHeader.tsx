import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import React, { FC, memo, useState } from 'react';
import styles from './HomePageHeader.module.css';

const HomePageHeader: FC = () => {
	const { siteConfig } = useDocusaurusContext();

	const installCommand = 'npm install @sapphire/framework';
	const [tippyTheme, setTippyTheme] = useState<'discord' | 'discord-clicked'>('discord');

	const handleClickInstallButton = async () => {
		setTippyTheme('discord-clicked');

		await navigator.clipboard.writeText(installCommand);

		setTimeout(() => {
			setTippyTheme('discord');
		}, 500);
	};

	return (
		<>
			<header className={clsx('hero', styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<div className={styles.buttons}>
						<Tippy
							interactive
							arrow
							content="Click me to copy install command!"
							placement="bottom"
							theme={tippyTheme}
							hideOnClick={false}
						>
							<button className="button button--secondary button--lg" onClick={handleClickInstallButton}>
								<div className={clsx(styles.buttonContent, { [styles.colorGreen]: tippyTheme === 'discord-clicked' })}>
									{installCommand}
									<ClipboardCopyIcon className={styles.copyIcon} />
								</div>
							</button>
						</Tippy>
					</div>
				</div>
			</header>
		</>
	);
};

export default memo(HomePageHeader);
