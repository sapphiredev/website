declare namespace NodeJS {
	interface ProcessEnv {}
}

declare module '*.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}
