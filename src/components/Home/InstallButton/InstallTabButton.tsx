import { ClipboardIcon } from '@heroicons/react/24/outline';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './InstallTabButton.module.css';

interface Props {
	installCommand: string;
	handleClickInstallButton(): void;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
function InstallTabButton({ installCommand, handleClickInstallButton }: Readonly<Props>) {
	const [showTippy, setShowTippy] = useState(false);

	const toggleTippy = () => {
		setShowTippy(true);

		setTimeout(() => {
			setShowTippy(false);
		}, 1000);
	};

	return (
		<Tippy visible={showTippy} content="Copied!" placement="auto" arrow theme="discord">
			<button
				className={clsx('button', 'button--secondary', 'button--lg', styles.button)}
				onClick={() => {
					handleClickInstallButton();
					toggleTippy();
				}}
			>
				<div className={clsx(styles.buttonContent)}>
					{installCommand}
					<ClipboardIcon className={styles.copyIcon} />
				</div>
			</button>
		</Tippy>
	);
}

export default InstallTabButton;
