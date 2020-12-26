import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import MTimelineItem, { TimelineItemProps as MTimelineItemProps } from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import React, { FC, memo, ReactNode } from 'react';

interface TimelineItemProps {
	/** Text to show in this TimelineItem */
	text: ReactNode;
	/** Props to apply to the TimelineItem component */
	BaseProps?: MTimelineItemProps;
}

const TimelineItem: FC<TimelineItemProps> = ({ text, BaseProps }) => {
	return (
		<MTimelineItem {...BaseProps}>
			<TimelineSeparator>
				<TimelineDot />
			</TimelineSeparator>
			<TimelineContent>{text}</TimelineContent>
		</MTimelineItem>
	);
};

export default memo(TimelineItem);
