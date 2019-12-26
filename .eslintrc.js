module.exports = {
    'extends': 'eslint:recommended',
    'rules': {
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        "complexity": ["error", 5],
        "camelcase": ["error", {
            "properties": "always"
        }],
        "new-cap": ["error", {
            "capIsNew": true,
            "newIsCap": true,
            "capIsNewExceptions": ["Router"]
        }],
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 2
        }]
    },
    'env': {
        'node': true,
        'es6': true
    },
    "parserOptions": {
        "ecmaVersion": 8,
        "ecmaFeatures": {
          //"ecmaVersion": 8,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
}