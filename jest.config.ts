export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  testPathIgnorePatterns: ["dist"],
  testMatch: [
    "**__tests__/**/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  modulePathIgnorePatterns: ["mocks"],
};
