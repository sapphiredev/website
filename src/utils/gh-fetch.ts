import type { Branch, Tag } from '@config/types/gh-api-types';
import { fetchJson } from './util';

export enum SapphireCommunity {
	Framework = 'framework',
	Plugins = 'plugins',
	Utilities = 'utilities',
	Pieces = 'pieces'
}

export const fetchBranchesAndTags = async (project: SapphireCommunity) => {
	const [branches, tags] = await Promise.all<Branch[], Tag[]>([
		fetchJson(`https://api.github.com/repos/sapphire-community/${project}/branches`),
		fetchJson(`https://api.github.com/repos/sapphire-community/${project}/tags`)
	]);

	return [...branches.map((b) => b.name), ...tags.map((t) => t.name)].filter(
		(bt) => !(bt.toLowerCase().startsWith('build') || bt.toLowerCase().startsWith('gh-'))
	);
};

export const fetchDocsJson = async (project: SapphireCommunity, tag: string) => {
	return fetchJson(`https://raw.githubusercontent.com/sapphire-community/${project}/docs/${tag}.json`);
};
