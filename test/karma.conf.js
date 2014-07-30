module.exports = function (config) {
  config.set({
    basePath: '..',
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ],
    reporters: [
      'coverage',
      'spec'
    ],
    preprocessors: {
      'src/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    }
  });
};
