import { createTheme } from '@material-ui/core/styles';
import type { TimelineClassKey } from '@material-ui/lab/Timeline';
import type { TimelineItemClassKey } from '@material-ui/lab/TimelineItem';

export default createTheme({
	typography: {
		fontFamily: [
			'Lato',
			'Roboto',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	palette: {
		type: 'dark',
		primary: {
			main: '#23529B',
			light: '#79A0DB',
			dark: '#15315C',
			contrastText: '#FFFFFF'
		},
		secondary: {
			main: '#2D2D2D',
			light: '#36393F',
			dark: '#212121',
			contrastText: '#FFFFFF'
		},
		background: {
			default: '#131516'
		},
		common: {
			white: '#EEEEEE',
			black: '#131516'
		},
		error: {
			main: '#C62828',
			dark: '#8E0000',
			light: '#FF5F52'
		}
	},
	overrides: {
		MuiTimelineItem: {
			root: {
				minHeight: 'unset'
			},
			missingOppositeContent: {
				'&::before': {
					flex: 'unset',
					content: 'unset',
					padding: 'unset'
				}
			}
		},
		MuiTimeline: {
			root: {
				marginTop: 0,
				paddingTop: 0,
				marginBottom: 0,
				paddingBottom: 0
			}
		}
	}
});

declare module '@material-ui/core/styles/overrides' {
	interface ComponentNameToClassKey {
		MuiTimelineItem: TimelineItemClassKey;
		MuiTimeline: TimelineClassKey;
	}
}
