import constate from 'constate';
import { useState } from 'react';

export const [ProjectCurrentTagProvider, getCurrentProjectTag, updateCurrentProjectTag] = constate(
	() => {
		const [currentTag, setCurrentTag] = useState<string>('main');

		return { currentTag, setCurrentTag };
	},
	(value) => value.currentTag,
	(value) => value.setCurrentTag
);

export default ProjectCurrentTagProvider;
