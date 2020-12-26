/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
	interface ProcessEnv {
		readonly BACKEND_URL: string;
	}
}

declare module '*.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}
