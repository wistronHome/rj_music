// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": 0,
        "semi": 0,
        "no-trailing-spaces": 0,
        "comma-dangle": 0,
        "space-before-function-paren": 0,
        "no-parsing-error": 0,
        "x-invalid-end-tag": 0,
        "no-unused-vars": 0,
        "quotes": 'off',
        "object-property-newline": 0,
        "no-multiple-empty-lines": 0,
        "semicolon": 0
    }
}
