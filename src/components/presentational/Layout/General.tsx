import Footer from '#presentational/Layout/Footer';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box, { BoxProps } from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { FC } from 'react';
import NavBar from './Navigation/NavBar';
import ScrollToTopButton from './ScrollToTopButton';

export interface GeneralPageProps {
	containerProps?: BoxProps;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		},
		contentBox: {
			paddingBottom: theme.spacing(16),
			paddingTop: theme.spacing(4),
			[theme.breakpoints.down('md')]: {
				paddingTop: theme.spacing(16)
			}
		}
	})
);

const GeneralPage: FC<GeneralPageProps> = ({ children, containerProps, ...props }) => {
	const classes = useStyles();

	return (
		<Box component="section" className={classes.container} {...containerProps}>
			<NavBar />

			<Box component="main" role="contentinfo" className={classes.contentBox}>
				{children}
			</Box>

			<Footer />

			<Box component="span">
				<ScrollToTopButton {...props}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollToTopButton>
			</Box>
		</Box>
	);
};

export default GeneralPage;
