import styles from '@site/src/components/Docs/styles/CodeLinkAnchor.module.css';
import React, { type FC } from 'react';

interface Props {
	url: string;
}

const CodeLinkAnchor: FC<Props> = ({ url }) => (
	<>
		<div className={styles.flexGrowFiller}></div>
		<a href={url} className={styles.anchor}>
			<svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
			</svg>
		</a>
	</>
);

export default CodeLinkAnchor;
