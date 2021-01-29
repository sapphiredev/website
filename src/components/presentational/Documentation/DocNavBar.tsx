import { Hidden } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React, { FC, memo } from 'react';
import ProjectSelector from './ProjectSelector';
import TagSelector from './TagSelector';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		flexBox: {
			flexGrow: 1,
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block'
			}
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto'
			}
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '20ch',
				'&:focus': {
					width: '30ch'
				}
			}
		}
	})
);

const DocNavBar: FC = () => {
	const classes = useStyles();

	return (
		<Box flexGrow={1}>
			<AppBar position="static" color="secondary">
				<Toolbar>
					<Grid container spacing={2} alignItems="center" alignContent="stretch" justify="flex-start">
						<Hidden smDown>
							<Grid item />
							<Grid item>
								<Typography variant="body1" noWrap>
									View docs for:
								</Typography>
							</Grid>
						</Hidden>
						<Grid item xs={6} md={4} lg={3}>
							<ProjectSelector />
						</Grid>
						<Grid item xs={6} md={4} lg={3}>
							<TagSelector />
						</Grid>
					</Grid>
					<Hidden smDown>
						<Box className={classes.search}>
							<Box className={classes.searchIcon}>
								<SearchIcon />
							</Box>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Box>
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default memo(DocNavBar);
