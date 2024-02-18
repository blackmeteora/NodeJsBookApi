module.exports = {
    // The root of your source code
    roots: ['<rootDir>/src'],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    // Test environment setup
    testEnvironment: 'node',
  
    // Test match pattern
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  };