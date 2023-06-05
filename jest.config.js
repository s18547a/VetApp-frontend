/** @type {import('ts-jest').JestConfigWithTsJest} */
var config = {
	verbose: true,
	preset: 'ts-jest',
	testPathIgnorePatterns: ['bootstrap-select'],
	transform: {
		'\\.js$': '<rootDir>/node_modules/babel-jest',
	},

	transformIgnorePatterns: ['/node_modules/(?!swiper|ssr-window|dom7)'],
	moduleNameMapper: {
		'swiper/react': ['<rootDir>/node_modules/swiper/react/swiper-react.js'],
	},
};
module.exports = config;
