#!/usr/bin/env node

import { docusaurusTypeDocJsonParser } from './parser';
import { config } from 'dotenv';
import { URLSearchParams } from 'node:url';

config();

await docusaurusTypeDocJsonParser({
	githubContentUrl: `https://api.github.com/repos/sapphiredev/docs/contents/docs?${new URLSearchParams({ ref: 'main' })}`,
	githubToken: process.env.GITHUB_TOKEN
});
