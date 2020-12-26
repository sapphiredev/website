import Router from 'next/router';

export async function ssrFetch<T>(url: string) {
	const response = await fetch(url, {
		headers: {
			'content-type': 'application/json'
		}
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw response;
	} else {
		return jsonResponse as T;
	}
}

export function navigate(path: string, forceSameTab = false) {
	if (!forceSameTab && (path.startsWith('http') || path.startsWith('//') || path.startsWith('mailto:'))) {
		return () => window.open(path, '_blank', 'noreferrer=yes');
	}
	return () => Router.push(path);
}
