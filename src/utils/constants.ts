import theme from '@config/theme';
import type { GroupableAutoCompleteOption } from '@mui/AutoComplete';
import { SapphireCommunity } from '@utils/gh-fetch';

export interface ProjectSelectionOption extends GroupableAutoCompleteOption {
	label: SapphireCommunity;
	groupName: 'Projects';
}

export interface ProjectTagOption extends GroupableAutoCompleteOption {
	groupName: 'Branches & Tags';
}

export const ServerURL = 'https://discord.com/invite/sapphiredev';
export const GithubUrl = 'https://github.com/sapphiredev';
export const NpmOrgUrl = 'https://www.npmjs.com/org/sapphire';
export const DiscordJsUrl = 'https://discord.js.org/';
export const VercelUrl = 'https://vercel.com?utm_source=sapphiredev&utm_campaign=oss';

export const SapphireProjects = Object.values(SapphireCommunity).map<ProjectSelectionOption>((label) => ({
	color: theme.palette.primary.contrastText,
	groupName: 'Projects',
	label
}));

export enum LocalStorageKeys {
	FrameworkTags = 'framework_tags',
	PluginsTags = 'plugins_tags',
	UtilitiesTags = 'utilities_tags',
	PiecesTags = 'pieces_tags'
}

export interface LocalStorageStructure<T> {
	expire: number;
	data: T;
}
