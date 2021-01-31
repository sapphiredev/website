import theme from '@config/theme';
import { updateCurrentProjectTag } from '@contexts/ProjectCurrentTagContext';
import { updateProjectSelection } from '@contexts/ProjectSelectionContext';
import { updateProjectTags } from '@contexts/ProjectTagsContext';
import AutoComplete from '@mui/AutoComplete';
import { ProjectSelectionOption, SapphireProjects } from '@utils/constants';
import { SapphireProject } from '@utils/gh-fetch';
import React, { FC, memo } from 'react';

const ProjectSelector: FC = () => {
	const setProjectSelection = updateProjectSelection();
	const setCurrentProjectTag = updateCurrentProjectTag();
	const setProjectTags = updateProjectTags();

	return (
		<AutoComplete<ProjectSelectionOption>
			options={SapphireProjects}
			handleChange={(newSelectedProject) => {
				setProjectTags(['main']);
				setCurrentProjectTag('main');
				setProjectSelection(newSelectedProject.label);
			}}
			defaultSearchValue={{ color: theme.palette.primary.contrastText, groupName: 'Projects', label: SapphireProject.Framework }}
			disableClearable
		/>
	);
};

export default memo(ProjectSelector);
