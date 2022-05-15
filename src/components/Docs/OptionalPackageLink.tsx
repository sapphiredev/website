import { ExternalLinkIcon } from '@heroicons/react/outline';
import styles from '@site/src/components/Docs/Link.module.css';
import React, { FC, ReactNode } from 'react';

interface Props {
	linkName: string;
	href: string;
	description: ReactNode;
}

const OptionalPackageLink: FC<Props> = ({ description, href, linkName }) => (
	<span className={styles.block}>
		<a href={href} className={styles.link}>
			<strong>{linkName}</strong>
			<ExternalLinkIcon className={styles.linkIcon} />
		</a>
		{description}
	</span>
);

export default OptionalPackageLink;
