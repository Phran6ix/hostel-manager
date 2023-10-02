export default {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.+(ts|tsx)", "**/?(*.)+(spec|test).+(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
