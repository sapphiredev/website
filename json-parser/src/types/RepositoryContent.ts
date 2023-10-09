export interface RepositoryContent {
	type: RepositoryContentFileType;

	name: string;

	url: string;

	download_url: string | null;
}

export enum RepositoryContentFileType {
	File = 'file',

	Directory = 'dir'
}
