import Router from 'next/router';
import type { LocalStorageKeys, LocalStorageStructure } from './constants';
import isBrowser from './isBrowser';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadState = <T>(key: LocalStorageKeys): T | null => {
	if (isBrowser) {
		const serializedState = localStorage.getItem(key);
		return serializedState ? (JSON.parse(serializedState) as T) : null;
	}

	return null;
};

export const saveState = <T>(key: LocalStorageKeys, state: LocalStorageStructure<T>): LocalStorageStructure<T> => {
	try {
		if (isBrowser) {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		}
	} catch {
		// intentionally empty
	}

	return state;
};

export const clearState = (key: LocalStorageKeys) => {
	if (isBrowser) {
		localStorage.removeItem(key);
	}
};

export async function fetchJson<T>(url: string) {
	if (process.env.NODE_ENV === 'development') {
		await sleep(1000);
	}

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

export enum Time {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
	Month = 1000 * 60 * 60 * 24 * (365 / 12),
	Year = 1000 * 60 * 60 * 24 * 365
}
