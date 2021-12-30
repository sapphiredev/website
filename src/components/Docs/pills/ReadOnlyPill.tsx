import styles from '@site/src/components/Docs/pills/Pills.module.css';
import React, { type FC } from 'react';

const ReadOnlyPill: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.pill}>Read-only</div>
	</div>
);

export default ReadOnlyPill;
