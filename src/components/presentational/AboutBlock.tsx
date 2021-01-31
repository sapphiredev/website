import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@routing/Link';
import { DiscordJsUrl } from '@utils/constants';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2),
			minHeight: 275,
			backgroundColor: theme.palette.secondary.dark,
			[theme.breakpoints.only('md')]: {
				minHeight: 350
			}
		},
		paperHeader: {
			fontWeight: 'bolder',
			fontSize: 18,
			paddingBottom: theme.spacing(2)
		}
	})
);

const AboutBlock: FC = () => {
	const classes = useStyles();

	return (
		<Paper elevation={2} classes={{ root: classes.paper }}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="body1" classes={{ root: classes.paperHeader }}>
						About
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						Sapphire is a next-gen object-oriented{' '}
						<Link href={DiscordJsUrl} TextTypographyProps={{ variant: 'body1' }} text="Discord.js" /> bot framework.
						<br />
						<br />
						Sapphire is a community driven framework that aims to give you all the features you need to make your Discord bot.
						<br />
						<br />
						With a history of many other Discord bot frameworks (both for NodeJS and other languages) to inspire Sapphire, it has become
						the ultimate modern experience of writing your code.
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default memo(AboutBlock);
