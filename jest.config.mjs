/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', 
    '!<rootDir>/src/presentation/controllers/**/*_protocol.ts',
    '!**/protocols/**'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config