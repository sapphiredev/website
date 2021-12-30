import styles from '@site/src/components/Docs/pills/Pills.module.css';
import React, { type FC } from 'react';
import clsx from 'clsx';

const DeprecatedPill: FC = () => (
	<div className={styles.wrapper}>
		<div className={clsx(styles.pill, styles.deprecatedPill)}>Deprecated</div>
	</div>
);

export default DeprecatedPill;
