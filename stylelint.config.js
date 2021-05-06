/* globals module */

const warn = {
    severity: 'warning'
};

module.exports = {
    rules: {
        'max-line-length': [
            120,
            warn
        ],
        'max-nesting-depth': [
            3,
            warn
        ],
        'no-descending-specificity': [
            true,
            warn
        ]
    }
};
