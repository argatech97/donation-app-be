// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "path/to/tsconfig.json",
    },
  },
};
