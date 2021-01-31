import theme from '@config/theme';
import { updateCurrentProjectTag } from '@contexts/ProjectCurrentTagContext';
import { getProjectSelection } from '@contexts/ProjectSelectionContext';
import { getProjectTags, updateProjectTags } from '@contexts/ProjectTagsContext';
import AutoComplete from '@mui/AutoComplete';
import { toTitleCase } from '@sapphire/utilities';
import { LocalStorageKeys, LocalStorageStructure, ProjectTagOption } from '@utils/constants';
import { fetchBranchesAndTags, SapphireProject } from '@utils/gh-fetch';
import { loadState, saveState, Time } from '@utils/util';
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

const projectsToLocalStorageKeys: Record<SapphireProject, LocalStorageKeys> = {
	[SapphireProject.Framework]: LocalStorageKeys.FrameworkTags,
	[SapphireProject.Pieces]: LocalStorageKeys.PiecesTags,
	[SapphireProject.Plugins]: LocalStorageKeys.PluginsTags,
	[SapphireProject.Utilities]: LocalStorageKeys.UtilitiesTags
};

const PluginRegex = /@sapphire\/plugin-([a-z]+).+/;
const UtilitiesRegex = /@sapphire\/([a-z-]+).+/;

const TagSelector: FC = () => {
	const projectSelection = getProjectSelection();
	const currentProjectTags = getProjectTags();
	const setProjectTags = updateProjectTags();
	const setCurrentProjectTag = updateCurrentProjectTag();
	const [triggerValueReset, setTriggerValueReset] = useState(false);

	const fetchNewBranchesAndTags = useCallback(async () => {
		const dataFromLocalStorage = loadState<LocalStorageStructure<string[]>>(projectsToLocalStorageKeys[projectSelection]);

		if (dataFromLocalStorage && (process.env.NODE_ENV === 'development' || dataFromLocalStorage.expire > Date.now())) {
			setProjectTags(dataFromLocalStorage.data);
		} else {
			const branchesAndTags = await fetchBranchesAndTags(projectSelection);
			setProjectTags(branchesAndTags);
			saveState<string[]>(projectsToLocalStorageKeys[projectSelection], { expire: Date.now() + Time.Hour * 6, data: branchesAndTags });
		}
	}, [projectSelection, setProjectTags]);

	useEffect(() => {
		void fetchNewBranchesAndTags();
	}, [fetchNewBranchesAndTags]);

	useEffect(() => {
		setTriggerValueReset((current) => !current);
	}, [projectSelection]);

	const currentOptions = useMemo(
		() =>
			currentProjectTags.map<ProjectTagOption>((tag) => ({
				label: tag,
				color: theme.palette.primary.contrastText,
				groupName: 'Branches & Tags'
			})),
		[currentProjectTags]
	);

	return (
		<AutoComplete<ProjectTagOption>
			options={currentOptions}
			handleChange={(newSelectedTag) => setCurrentProjectTag(newSelectedTag.label)}
			defaultSearchValue={{ color: theme.palette.primary.contrastText, groupName: 'Branches & Tags', label: 'main' }}
			triggerValueReset={triggerValueReset}
			groupBy={(option) => {
				if (projectSelection === SapphireProject.Plugins) {
					const groupName = PluginRegex.exec(option.label)?.[1] ?? 'Branches';
					return toTitleCase(groupName);
				} else if (projectSelection === SapphireProject.Utilities) {
					const groupName = UtilitiesRegex.exec(option.label)?.[1] ?? 'Branches';
					return toTitleCase(groupName);
				}

				return option.groupName;
			}}
			disableClearable
		/>
	);
};

export default memo(TagSelector);
