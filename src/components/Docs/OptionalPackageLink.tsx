import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import styles from '@site/src/components/Docs/styles/Link.module.css';
import React, { type FC, type ReactNode } from 'react';

interface Props {
	linkName: string;
	href: string;
	description: ReactNode;
}

const OptionalPackageLink: FC<Props> = ({ description, href, linkName }) => (
	<span className={styles.block}>
		<a href={href} className={styles.link}>
			<strong>{linkName}</strong>
			<ArrowTopRightOnSquareIcon className={styles.linkIcon} />
		</a>
		{description}
	</span>
);

export default OptionalPackageLink;
