import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import React, { FC } from 'react';
import InstallTabButton from './InstallTabButton';
import styles from './InstallTabs.module.css';

const InstallTabs: FC = () => {
	const npmInstallCommand = 'npm install @sapphire/framework';
	const yarnInstallCommand = 'yarn add @sapphire/framework';

	const handleClickInstallButton = async (command: string) => {
		await navigator.clipboard.writeText(command);
	};

	return (
		<div className={styles.buttons}>
			<Tabs groupId="npm2yarn" className={styles.tabs}>
				<TabItem value="npm" label="NPM" default>
					<InstallTabButton
						installCommand={npmInstallCommand}
						handleClickInstallButton={() => handleClickInstallButton(npmInstallCommand)}
					/>
				</TabItem>
				<TabItem value="yarn" label="Yarn">
					<InstallTabButton
						installCommand={yarnInstallCommand}
						handleClickInstallButton={() => handleClickInstallButton(yarnInstallCommand)}
					/>
				</TabItem>
			</Tabs>
		</div>
	);
};

export default InstallTabs;
