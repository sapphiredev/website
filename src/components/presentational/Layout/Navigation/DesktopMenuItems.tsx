import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@mui/Tooltip';
import Link from '@routing/Link';
import { GithubUrl, ServerURL } from '@utils/constants';
import DiscordIcon from 'mdi-react/DiscordIcon';
import DocumentationIcon from 'mdi-react/FileDocumentMultipleIcon';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		transparentButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		},
		menuButton: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2)
		},
		popper: {
			marginTop: theme.spacing(-1),
			zIndex: theme.zIndex.drawer + 1
		},
		muiSvgIcon: {
			width: 24,
			height: 24
		}
	})
);

const DesktopMenuItems: FC = () => {
	const router = useRouter();
	const classes = useStyles();

	return (
		<>
			{router.pathname !== '/' && (
				<Tooltip title="Go back to the homepage" placement="bottom">
					<Link href="/">
						<Button
							color="primary"
							variant="contained"
							classes={{ root: classes.transparentButton }}
							startIcon={<HomeIcon className={classes.muiSvgIcon} />}
						>
							<Typography variant="body2" color="textPrimary">
								Home
							</Typography>
						</Button>
					</Link>
				</Tooltip>
			)}
			<Tooltip title="Click to view documentation" placement="bottom">
				<Box>
					<Link href="/docs">
						<Button color="primary" variant="contained" classes={{ root: classes.transparentButton }} startIcon={<DocumentationIcon />}>
							<Typography variant="body2" color="textPrimary">
								Documentation
							</Typography>
						</Button>
					</Link>
				</Box>
			</Tooltip>
			<Tooltip title="Click to join Sapphire Community Discord server" placement="bottom">
				<Link href={ServerURL}>
					<Button color="primary" variant="contained" classes={{ root: classes.transparentButton }} startIcon={<DiscordIcon />}>
						<Typography variant="body2" color="textPrimary">
							Discord
						</Typography>
					</Button>
				</Link>
			</Tooltip>
			<Tooltip title="View Sapphire Community on GitHub" placement="bottom">
				<Link href={GithubUrl}>
					<Button
						color="primary"
						variant="contained"
						classes={{ root: classes.transparentButton }}
						startIcon={<GitHubIcon className={classes.muiSvgIcon} />}
					>
						<Typography variant="body2" color="textPrimary">
							GitHub
						</Typography>
					</Button>
				</Link>
			</Tooltip>
		</>
	);
};

export default memo(DesktopMenuItems);
