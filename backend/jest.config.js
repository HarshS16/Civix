module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000, // Optional: increase timeout for async operations
  setupFilesAfterEnv: ['./jest.setup.js'], // Optional: for global setup
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};
