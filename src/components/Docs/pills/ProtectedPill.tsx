import styles from '@site/src/components/Docs/pills/Pills.module.css';
import React, { type FC } from 'react';

const ProtectedPill: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.pill}>Protected</div>
	</div>
);

export default ProtectedPill;
