module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/__tests__/**', '!**/__mocks__/**', '!jobs/*/index.ts'],
  coveragePathIgnorePatterns: [
    '/src/server.ts',
  ],
  coverageDirectory: '../coverage/unit',
  testEnvironment: 'node',
};
