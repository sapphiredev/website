import SapphireLogo from '@assets/SapphireLogo';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AboutBlock from '@presentational/AboutBlock';
import InstallFrameworkBlock from '@presentational/InstallFrameworkBlock';
import KeyFeaturesBlock from '@presentational/KeyFeaturesBlock';
import GeneralPage from '@presentational/Layout/General';
import type { NextPage } from 'next';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'space-between',
			justifyContent: 'space-between'
		},
		headerText: {
			[theme.breakpoints.down('sm')]: {
				fontSize: '4rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '2rem'
			}
		},
		sapphireLogo: {
			height: 100,
			[theme.breakpoints.down('sm')]: {
				height: 75
			},
			[theme.breakpoints.down('xs')]: {
				height: 75
			}
		}
	})
);

const Index: NextPage = () => {
	const classes = useStyles();

	return (
		<>
			<GeneralPage>
				<Container maxWidth="lg">
					<Grid container spacing={4} direction="column" justifyContent="center" alignContent="center" alignItems="center">
						<Grid item xs={12} lg={12}>
							<Box display="flex" alignItems="center" alignContent="center" justifyContent="center">
								<Typography variant="h1" classes={{ root: classes.header }}>
									<SapphireLogo className={classes.sapphireLogo} /> <span className={classes.headerText}>Sapphire</span>
								</Typography>
							</Box>
						</Grid>
						<Grid container spacing={6} item xs={12}>
							<Grid item xs={12} md={6}>
								<InstallFrameworkBlock />
							</Grid>
							<Grid item xs={12} md={6}>
								<InstallFrameworkBlock canaryBuild />
							</Grid>
						</Grid>
						<Grid container spacing={6} item xs={12}>
							<Grid item xs={12} md={6}>
								<AboutBlock />
							</Grid>
							<Grid item xs={12} md={6}>
								<KeyFeaturesBlock />
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</GeneralPage>
		</>
	);
};

export default Index;
