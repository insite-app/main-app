module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
    '\\.css$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
};
