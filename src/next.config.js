const withPWA = require('next-pwa');
const withMDX = require('@next/mdx');

const debug = process.env.NODE_ENV !== 'production';

module.exports = withMDX(
	withPWA({
		extension: /\.mdx?$/,
		assetPrefix: !debug ? '/website/' : '',
		pwa: {
			dest: 'public',
			disable: debug
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
