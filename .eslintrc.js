module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        "no-duplicate-imports": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "sort-imports": ["error", {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
        }],
        "semi": ["error", "always"],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "quotes": ["error", "double"],
        "max-len": ["error", { "code": 120, "tabWidth": 4 }],
        "space-before-function-paren": ["error", "never"],
    },
};
