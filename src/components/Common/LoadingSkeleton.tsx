import useThemeContext from '@theme/hooks/useThemeContext';
import clsx from 'clsx';
import React, { CSSProperties, FC, memo } from 'react';
import styles from './LoadingSkeleton.module.css';

const LoadingSkeleton: FC<CSSProperties> = (props) => {
	const { isDarkTheme } = useThemeContext();

	return (
		<div
			className={clsx(styles.loadingSkeleton, {
				[styles.lightLoadingSkeleton]: !isDarkTheme,
				[styles.darkLoadingSkeleton]: isDarkTheme
			})}
			style={props}
		/>
	);
};

export default memo(LoadingSkeleton);
