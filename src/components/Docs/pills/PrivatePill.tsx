import styles from '@site/src/components/Docs/pills/Pills.module.css';
import React, { type FC } from 'react';

const PrivatePill: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.pill}>Private</div>
	</div>
);

export default PrivatePill;
