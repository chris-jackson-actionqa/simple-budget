const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!coverage/**",
    "!jest.config.js",
    "!server.js",
  ],
};

module.exports = config;
