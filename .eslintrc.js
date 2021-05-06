module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: [],
    parserOptions: {
        project: ['./tsconfig.json', './scripts/tsconfig.json'],
        ecmaVersion: 2020
    },
    plugins: ['only-warn']
};
