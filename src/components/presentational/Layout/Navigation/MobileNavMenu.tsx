import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItemLink from '@routing/MenuItemLink';
import { GithubUrl, ServerURL } from '@utils/constants';
import DiscordIcon from 'mdi-react/DiscordIcon';
import DocumentationIcon from 'mdi-react/FileDocumentMultipleIcon';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2)
		},
		popper: {
			marginTop: theme.spacing(1),
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		},
		transparentButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		}
	})
);

const MobileNavMenu: FC = () => {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);

	const router = useRouter();

	const togglePopperMenu = () => {
		setPopperMenuOpen((prevOpen) => !prevOpen);
	};

	const closePopperMenu = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setPopperMenuOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setPopperMenuOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const popperMenuPrevOpen = useRef(popperMenuIsOpen);

	useEffect(() => {
		if (popperMenuPrevOpen.current && !popperMenuIsOpen) {
			anchorRef.current?.focus();
		}

		popperMenuPrevOpen.current = popperMenuIsOpen;
	}, [popperMenuIsOpen]);

	return (
		<>
			<IconButton
				ref={anchorRef}
				edge="start"
				aria-controls={popperMenuIsOpen ? 'menu-popover' : undefined}
				aria-haspopup="true"
				className={classes.menuButton}
				color="inherit"
				aria-label="menu"
				onClick={togglePopperMenu}
			>
				<MenuIcon />
			</IconButton>
			<Popper className={classes.popper} open={popperMenuIsOpen} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={closePopperMenu}>
								<MenuList autoFocusItem={popperMenuIsOpen} id="menu-popover" onKeyDown={handleListKeyDown}>
									{router.pathname !== '/' && <MenuItemLink href="/" Icon={<HomeIcon />} text="Go back home" />}
									<MenuItemLink href="/docs" Icon={<DocumentationIcon />} text="Documentation" />
									<MenuItemLink href={ServerURL} Icon={<DiscordIcon />} text="Discord" />
									<MenuItemLink href={GithubUrl} Icon={<GitHubIcon />} text="GitHub" />
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default memo(MobileNavMenu);
