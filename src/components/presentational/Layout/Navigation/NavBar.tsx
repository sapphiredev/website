import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import DesktopMenuItems from './DesktopMenuItems';
import MobileNavMenu from './MobileNavMenu';
import SkyraLogoButton from './SapphireLogoButton';

const NavBar: FC = () => {
	const router = useRouter();

	return (
		<Box component="nav">
			<AppBar position="sticky" elevation={router.pathname.startsWith('/docs') ? 1 : 4}>
				<Toolbar>
					<Hidden mdUp>
						<MobileNavMenu />
					</Hidden>

					<SkyraLogoButton />

					<Hidden smDown>
						<DesktopMenuItems />
					</Hidden>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default memo(NavBar);
