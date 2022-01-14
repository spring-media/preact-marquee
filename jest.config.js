module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        'src/Marquee.tsx'
    ],
    moduleNameMapper: {
        '\\.scss$': '<rootDir>/jest/mocks/empty-module.js'
    },
};
