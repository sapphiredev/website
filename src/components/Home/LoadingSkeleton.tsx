import { useColorMode } from '@docusaurus/theme-common';
import styles from '@site/src/components/Home/LoadingSkeleton.module.css';
import clsx from 'clsx';
import React, { CSSProperties, FC } from 'react';

const LoadingSkeleton: FC<CSSProperties> = (props) => {
	const { colorMode } = useColorMode();

	return (
		<div
			className={clsx(styles.loadingSkeleton, {
				[styles.lightLoadingSkeleton]: colorMode === 'light',
				[styles.darkLoadingSkeleton]: colorMode === 'dark'
			})}
			style={props}
		/>
	);
};

export default LoadingSkeleton;
