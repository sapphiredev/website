import TimelineItem from '#mui/TimelineItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
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

const KeyFeaturesBlock: FC = () => {
	const classes = useStyles();

	return (
		<Paper elevation={2} classes={{ root: classes.paper }}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="body1" classes={{ root: classes.paperHeader }}>
						Key Features
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Timeline>
						<TimelineItem text="Advanced plugin support" />
						<TimelineItem text="Supports both CommonJS and ESM" />
						<TimelineItem text="Completely modular and extendable" />
						<TimelineItem text="Designed with first class TypeScript support in mind" />
						<TimelineItem text="Includes optional utilities that you can use in any project" />
					</Timeline>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default memo(KeyFeaturesBlock);
