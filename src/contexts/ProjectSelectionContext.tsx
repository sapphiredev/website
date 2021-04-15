import { SapphireCommunity } from '@utils/gh-fetch';
import constate from 'constate';
import { useState } from 'react';

export const [ProjectSelectionProvider, getProjectSelection, updateProjectSelection] = constate(
	() => {
		const [project, setProject] = useState<SapphireCommunity>(SapphireCommunity.Framework);

		return { project, setProject };
	},
	(value) => value.project,
	(value) => value.setProject
);

export default ProjectSelectionProvider;
