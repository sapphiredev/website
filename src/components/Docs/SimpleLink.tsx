import { ExternalLinkIcon } from '@heroicons/react/outline';
import styles from '@site/src/components/Docs/Link.module.css';
import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
	linkName: string;
	href: string;
	noRightMargin: boolean;
}

const SimpleLink: FC<Props> = ({ href, linkName, noRightMargin = false }) => (
	<a href={href} className={styles.link}>
		{linkName}
		<ExternalLinkIcon className={clsx(styles.linkIcon, { [styles.linkIconNoMarginRight]: noRightMargin })} />
	</a>
);

export default SimpleLink;
