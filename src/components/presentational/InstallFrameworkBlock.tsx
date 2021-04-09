import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { FC, memo } from 'react';

interface InstallFrameworkBlockProps {
	/**
	 * Whether this block is for the canary build or not
	 * @default false
	 */
	canaryBuild?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		padding: {
			padding: theme.spacing(2)
		},
		paper: {
			backgroundColor: theme.palette.secondary.dark,
			[theme.breakpoints.only('md')]: {
				minHeight: 175
			}
		},
		installFromText: {
			fontWeight: 'bolder',
			fontSize: 18,
			paddingBottom: theme.spacing(2)
		},
		codeBlock: {
			backgroundColor: theme.palette.secondary.light
		},
		codeText: {
			fontFamily: [
				"'Fira Code'",
				'Consolas',
				"'Andale Mono WT'",
				"'Andale Mono'",
				"'Lucida Console'",
				"'Lucida Sans Typewriter'",
				"'DejaVu Sans Mono'",
				"'Bitstream Vera Sans Mono'",
				"'Liberation Mono'",
				"'Nimbus Mono L'",
				"'Monaco'",
				"'Courier New'",
				'Courier',
				'monospace'
			].join(', ')
		}
	})
);

const InstallFrameworkBlock: FC<InstallFrameworkBlockProps> = ({ canaryBuild = false }) => {
	const classes = useStyles();

	return (
		<Paper elevation={2} classes={{ root: clsx(classes.padding, classes.paper) }}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="body1" align="center" classes={{ root: classes.installFromText }}>
						Install {canaryBuild ? 'Canary' : 'Stable'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Box className={clsx(classes.padding, classes.codeBlock)}>
						<Typography variant="body1" align="center" classes={{ root: classes.codeText }}>
							npm install {canaryBuild ? 'github:sapphire-community/framework#build' : '@sapphire/framework'}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default memo(InstallFrameworkBlock);
