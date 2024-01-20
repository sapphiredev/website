import { useEffect } from 'react';

export default function Discord(): JSX.Element {
	useEffect(() => {
		window.location.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SP738BQTQQYZY';
	}, []);

	return <></>;
}
