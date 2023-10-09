import styles from '@site/src/components/Docs/pills/Pills.module.css';
import React, { type FC } from 'react';

const StaticPill: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.pill}>Static</div>
	</div>
);

export default StaticPill;
