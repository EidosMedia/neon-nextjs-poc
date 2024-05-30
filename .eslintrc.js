const commonEslint = {
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', 'react-hooks', 'jsdoc'],
    extends: [
        'airbnb-base',
        'prettier',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsdoc/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'eslint:recommended',
        'plugin:@next/next/recommended'
    ],
    rules: {
        /* Custom rules go here
            ['error' | 'warn' | 'off', {options}]
        */
        'prettier/prettier': 'error',
        'import/order': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '.storybook/**',
                    '**/test/**',
                    '**/*.stories.?s',
                    '**/*.test.?s',
                    '**/*.test.?sx',
                    '**/mocks/**',
                    '**/mock/**',
                    '**/*.mocks.?s'
                ]
            }
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/prefer-default-export': 'off',
        'import/no-named-as-default': 'off',
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'lines-between-class-members': 'off',
        'class-methods-use-this': 'off',
        'no-console': 'off',
        'react/prop-types': ['error', { ignore: ['children'] }],
        'no-underscore-dangle': 'off',
        'no-use-before-define': ['error', { variables: false }],
        'no-useless-constructor': 'off',
        'no-restricted-syntax': ['off', 'ForOfStatement'],
        'func-names': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        radix: ['error', 'as-needed'],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies,
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-description': 'error',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off'
    },
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features,
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            legacyDecorators: true,
            jsx: true // Allows for the parsing of JSX
        }
    },
    globals: {
        eidosmedia: 'writable',
        document: 'readonly',
        window: 'readonly',
        eomeditor: 'writable',
        $: 'readonly',
        LESS_VARIABLES: 'readonly',
        _: 'readonly',
        moment: 'readonly',
        List: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
    },
    settings: {
        react: {
            version: '17.0.0'
        },
        jest: {
            version: '25'
        },
        'import/resolver': {
            alias: {
                map: [
                    ['@/components', './src/components'],
                    ['@/pages', './pages'],
                    ['@/lib', './src/lib'],
                    ['@/types', './src/types'],
                    ['@/utils', './src/utils'],
                    ['@/themes', './src/themes']
                ]
            }
        }
    },
    env: {
        browser: true
    }
};

module.exports = commonEslint;
