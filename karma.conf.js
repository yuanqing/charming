'use strict';

module.exports = function(config) {
  config.set({
    basePath: '.',
    autoWatch: true,
    frameworks: ['jasmine', 'browserify'],
    browsers: ['PhantomJS'],
    plugins: [
      'browserify-istanbul',
      'karma-browserify',
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ],
    reporters: [
      'coverage',
      'spec'
    ],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'lcov' },
        { type: 'text' }
      ]
    },
    preprocessors: {
      'test/*.js': ['browserify']
    },
    browserify: {
      transform: [
        [
          'browserify-istanbul',
          {
            ignore: ['**/node_modules/**', '**/test/**'],
            defaultIgnore: true
          }
        ]
      ]
    },
    files: [
      'test/*.js'
    ]
  });
};
