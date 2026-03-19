module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    
    '/node_modules/(?!(@faker-js/faker)/)',
  ],
  testEnvironment: 'node',
};