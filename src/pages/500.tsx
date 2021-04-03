import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import { createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GeneralPage from '@presentational/Layout/General';
import Link from '@routing/Link';
import { ServerURL, VercelUrl } from '@utils/constants';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			overflowY: 'hidden'
		},
		text: {
			lineHeight: theme.spacing(0.2),
			textAlign: 'center',
			marginBottom: theme.spacing(5)
		}
	})
);

const Page500: NextPage = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const VercelStatusPage = 'https://www.vercel-status.com';

	return (
		<>
			<NextSeo title="500" description="Server Error!" nofollow noindex robotsProps={robotBlockingPageProps} />
			<GeneralPage>
				<Container maxWidth="md">
					<Grid container direction="column" justify="center" alignContent="stretch" alignItems="center" classes={{ root: classes.root }}>
						<Grid item>
							<Typography variant={isOnMobile ? 'h5' : 'h4'} color="textPrimary" classes={{ root: classes.text }}>
								Oh dear! It looks like the server is having issues. This website is being hosted on{' '}
								<Link
									href={VercelUrl}
									text="Vercel"
									TextTypographyProps={{
										variant: isOnMobile ? 'h5' : 'h4',
										color: 'textPrimary',
										classes: { root: classes.text }
									}}
								/>{' '}
								so you can start by looking if Vercel is having issues by checking{' '}
								<Link
									href={VercelStatusPage}
									text="the Vercel server status page"
									TextTypographyProps={{
										variant: isOnMobile ? 'h5' : 'h4',
										color: 'textPrimary',
										classes: { root: classes.text }
									}}
								/>
								. If all reports operational on the server status then feel free to join{' '}
								<Link
									href={ServerURL}
									text="the Sapphire Discord server"
									TextTypographyProps={{
										variant: isOnMobile ? 'h5' : 'h4',
										color: 'textPrimary',
										classes: { root: classes.text }
									}}
								/>
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</GeneralPage>
		</>
	);
};

export default Page500;
