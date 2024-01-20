import { useEffect } from 'react';

export default function Discord(): JSX.Element {
	useEffect(() => {
		window.location.href = 'https://discord.gg/sapphiredev';
	}, []);

	return <></>;
}
