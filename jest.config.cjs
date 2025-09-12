/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        // Dire à ts-jest d'utiliser tsconfig.json pour les paths
        tsconfig: {
          baseUrl: ".",
          paths: {
            "@/*": ["./src/*"],
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|webp|ico)$": "jest-transform-stub",
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
};

module.exports = config;
