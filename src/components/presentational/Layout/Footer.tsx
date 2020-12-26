import SapphireLogo from '#assets/SapphireLogo';
import Link from '#routing/Link';
import { GithubUrl, NpmOrgUrl, ServerURL } from '#utils/constants';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import React, { memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'fixed',
			bottom: 0,
			width: '100%',
			padding: '15px 0px',
			background: theme.palette.secondary.main
		},
		container: {
			display: 'flex',
			justifyContent: 'space-around',
			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				alignItems: 'center',

				'& > *:not(:first-of-type)': {
					marginTop: 20
				}
			}
		}
	})
);

const Left = () => (
	<Box textAlign="left" display="flex" flexDirection="column">
		<Link href="https://ko-fi.com/sapphireproject" text="Ko-fi" />
		<Link href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SP738BQTQQYZY" text="PayPal" />
		<Link href="https://www.patreon.com/sapphire_project" text="Patreon" />
		<Link href="https://opencollective.com/sapphire-project" text="Open Collective" />
	</Box>
);
const Right = () => (
	<Box textAlign="right" display="flex" flexDirection="column">
		<Link href="/" text="// TODO: FILL IN" />
		<Link href={ServerURL} text="Support Server" />
		<Link href={NpmOrgUrl} text="NPM Organization" />
		<Link href={GithubUrl} text="GitHub Organization" />
	</Box>
);

const Middle = () => (
	<Box display="flex" flexDirection="column">
		<SapphireLogo />
		<Typography style={{ marginTop: 15 }} variant="caption">
			Copyright © 2020 The Sapphire Project and its contributors.
		</Typography>
	</Box>
);

const Footer = () => {
	const classes = useStyles();

	return (
		<Box component="footer" className={classes.root}>
			<Container maxWidth="md">
				<Hidden xsDown>
					<Box className={classes.container}>
						<Left />
						<Middle />
						<Right />
					</Box>
				</Hidden>
				<Hidden smUp>
					<Box className={classes.container}>
						<Box display="flex" justifyContent="space-between" width="100%" px={3}>
							<Left />
							<Right />
						</Box>
						<Middle />
					</Box>
				</Hidden>
			</Container>
		</Box>
	);
};

export default memo(Footer);
