const withPWA = require('next-pwa');
const withMDX = require('@next/mdx');

module.exports = withMDX(
	withPWA({
		extension: /\.mdx?$/,
		pwa: {
			dest: 'public',
			disable: process.env.NODE_ENV === 'development'
		},
		async rewrites() {
			return [
				{
					source: '/index',
					destination: '/'
				}
			];
		}
	})
);
