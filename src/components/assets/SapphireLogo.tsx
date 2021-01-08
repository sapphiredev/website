import { createStyles, makeStyles } from '@material-ui/core';
import React, { FC, memo, SVGProps } from 'react';

type SapphireLogoProps = Omit<SVGProps<SVGElement>, 'ref'>;

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			'&:hover': {
				animation: `$skyraLogoSpin 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1)`
			}
		},
		'@keyframes skyraLogoSpin': {
			'0%': {
				transform: 'rotate(0deg)'
			},
			'100%': {
				transform: 'rotate(360deg)'
			}
		}
	})
);

const SapphireLogo: FC<SapphireLogoProps> = (props) => {
	const classes = useStyles();

	return (
		<svg className={classes.root} height="32" viewBox="0 0 1024 1024" {...props}>
			<g>
				<path
					d="M 320.9 290.4 L 286.65 324.65 286.65 785.05 286.6 785.05 477.75 976.2 494.3 959.7 494.3 959.65 320.9 750.8 320.9 726.75 320.9 520.55 320.9 290.4 M 703.1 290.35 L 703.1 317.65 703.1 588.55 703.1 750.85 702.85 751.15 737.35 716.65 737.35 239 554.8 56.45 529.75 81.5 703.1 290.35 Z"
					fill="#FFFFFF"
				/>

				<path
					d="M 529.75 81.5 L 554.8 56.45 512 13.65 286.65 239 286.65 324.65 320.9 290.4 348.8 262.5 348.75 262.45 320.9 290.35 512 60.15 529.75 81.5 M 737.35 785.1 L 737.35 716.65 702.85 751.15 512 981 494.3 959.7 477.75 976.2 512 1010.45 737.35 785.1 M 702.85 751.15 L 703.1 750.85 654.7 799.25 654.7 799.25 702.85 751.15 Z"
					fill="#4782DE"
				/>

				<path fill="#69A0F5" d="M 703.1 588.55 L 703.1 317.65 320.9 520.55 320.9 726.75 703.1 588.55 Z" />
			</g>
		</svg>
	);
};

export default memo(SapphireLogo);
