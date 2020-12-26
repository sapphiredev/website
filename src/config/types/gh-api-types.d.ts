export interface Branch {
	name: string;
	commit: CommitInfo;
	protected: boolean;
}

export interface Tag {
	name: string;
	zipball_url: string;
	tarball_url: string;
	commit: CommitInfo;
	node_id: string;
}

interface CommitInfo {
	sha: string;
	url: string;
}
