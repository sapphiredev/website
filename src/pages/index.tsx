import SapphireLogo from '#assets/SapphireLogo';
import { createSeoProps } from '#config/next-seo.config';
import AboutBlock from '#presentational/AboutBlock';
import InstallFrameworkBlock from '#presentational/InstallFrameworkBlock';
import KeyFeaturesBlock from '#presentational/KeyFeaturesBlock';
import GeneralPage from '#presentational/Layout/General';
import { createStyles, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'space-between',
			justifyContent: 'space-between'
		}
	})
);

const Index: NextPage = () => {
	const classes = useStyles();

	return (
		<>
			<NextSeo {...createSeoProps()} />
			<GeneralPage>
				<Container maxWidth="lg">
					<Grid container spacing={8} justify="space-between" alignContent="space-between" alignItems="center">
						<Grid item xs={12} lg={12}>
							<Box display="flex" alignItems="center" alignContent="center" justifyContent="center">
								<Typography variant="h1" classes={{ root: classes.header }}>
									<SapphireLogo height="100" /> Sapphire
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<InstallFrameworkBlock />
						</Grid>
						<Grid item xs={12} md={6}>
							<InstallFrameworkBlock canaryBuild />
						</Grid>
						<Grid item xs={12} md={6}>
							<AboutBlock />
						</Grid>
						<Grid item xs={12} md={6}>
							<KeyFeaturesBlock />
						</Grid>
					</Grid>
				</Container>
			</GeneralPage>
		</>
	);
};

export default Index;
