// Karma configuration
// Generated on Thu May 18 2017 10:47:12 GMT+0300 (+03)

const path = require('path');

module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],


		// list of files / patterns to load in the browser
		files: [
			'./node_modules/babel-polyfill/dist/polyfill.js',
			'./src/**/*.spec.js'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./src/**/*.spec.js': ['webpack']
		},

		// webpack configuration
		webpack: {
			devtool: 'inline-source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						use: [{
							loader: 'babel-loader',
							options: {
								babelrc: true,       // брать настройки из options
								cacheDirectory: true // включить кширование (node_modules/.cache/babel-loader)
							},
						}],
					},
					// instrument only testing sources with Istanbul
					{
						test: /\.js$/,
						exclude: /(node_modules|\.spec\.js$)/,
						loader: 'istanbul-instrumenter-loader',
						enforce: 'post',
						options: {
							esModules: true
						}
					}
				]
			}
		},

		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},

		webpackMiddleware: {
			stats: 'errors-only',
			noInfo: true
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage-istanbul'],

		plugins: [
			'karma-chrome-launcher',
			'karma-coverage-istanbul-reporter',
			'karma-mocha',
			'karma-chai',
			'karma-sinon',
			'karma-webpack'
		],

		// any of these options are valid: https://github.com/istanbuljs/istanbul-api/blob/47b7803fbf7ca2fb4e4a15f3813a8884891ba272/lib/config.js#L33-L38
		coverageIstanbulReporter: {
			skipFilesWithNoCoverage: false,
			reports: ['html'],
			dir: path.join(__dirname, 'coverage', 'html')
		},
		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
		// config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadless'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	});
};
