import constate from 'constate';
import { useState } from 'react';

export const [ProjectTagsProvider, getProjectTags, updateProjectTags] = constate(
	() => {
		const [tags, setTags] = useState<string[]>([]);

		return { tags, setTags };
	},
	(value) => value.tags,
	(value) => value.setTags
);

export default ProjectTagsProvider;
