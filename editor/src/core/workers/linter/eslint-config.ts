import type { Linter } from 'eslint'

const EsLintRecommended: Linter.RulesRecord = {
  // Currently on 6.8.0 ruleset: https://github.com/eslint/eslint/blob/v6.8.0/conf/eslint-recommended.js
  // This requires manually updating on each release. Urgh.
  'constructor-super': 'error',
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-const-assign': 'error',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-extra-semi': 'error',
  'no-fallthrough': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-inner-declarations': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-misleading-character-class': 'error',
  'no-mixed-spaces-and-tabs': 'error',
  'no-new-symbol': 'error',
  'no-obj-calls': 'error',
  'no-octal': 'error',
  'no-prototype-builtins': 'error',
  'no-redeclare': 'error',
  'no-regex-spaces': 'error',
  'no-self-assign': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-undef': 'error',
  'no-unexpected-multiline': 'error',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unused-labels': 'error',
  'no-unused-vars': 'warn',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  'no-with': 'error',
  'require-yield': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
}

export const ESLINT_CONFIG: Linter.Config = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    es2020: true,
    browser: true,
  },
  extends: [], // Not supported in browser - to add these, you have to explicitly add them below
  plugins: [], // plugin rules are loaded using the CustomUtopiaLinter
  globals: {
    __DEV__: false,
    __dirname: false,
    alert: false,
    Blob: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    File: false,
    FileReader: false,
    FormData: false,
    global: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    WebSocket: false,
    window: false,
    XMLHttpRequest: false,
  },
  rules: {
    ...EsLintRecommended,
    // basic eslint rules
    // http://eslint.org/docs/rules/
    'array-callback-return': 'warn',
    'default-case': ['warn', { commentPattern: '^no default$' }],
    'dot-location': ['warn', 'property'],
    eqeqeq: ['warn', 'smart'],
    'new-parens': 'warn',
    'no-array-constructor': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': ['warn', 'except-parens'],
    'no-const-assign': 'warn',
    'no-control-regex': 'warn',
    'no-delete-var': 'warn',
    'no-dupe-args': 'warn',
    'no-dupe-class-members': 'warn',
    'no-dupe-keys': 'warn',
    'no-duplicate-case': 'warn',
    'no-empty-character-class': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'warn',
    'no-ex-assign': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-label': 'warn',
    'no-fallthrough': 'warn',
    'no-func-assign': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-regexp': 'warn',
    'no-iterator': 'warn',
    'no-label-var': 'warn',
    'no-labels': ['warn', { allowLoop: true, allowSwitch: false }],
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-multi-str': 'warn',
    'no-native-reassign': 'warn',
    'no-negated-in-lhs': 'warn',
    'no-new-func': 'warn',
    'no-new-object': 'warn',
    'no-new-symbol': 'warn',
    'no-new-wrappers': 'warn',
    'no-obj-calls': 'warn',
    'no-octal': 'warn',
    'no-octal-escape': 'warn',
    'no-regex-spaces': 'warn',
    'no-restricted-syntax': ['warn', 'WithStatement'],
    'no-script-url': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-shadow-restricted-names': 'warn',
    'no-sparse-arrays': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-this-before-super': 'warn',
    'no-throw-literal': 'warn',
    'no-undef': 'error',
    'no-unreachable': 'warn',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-labels': 'warn',
    // disabling 'no-unused-vars' because the current ui.js is not working nicely with it
    // 'no-unused-vars': [
    //   'warn',
    //   {
    //     args: 'none',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    'no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-rename': [
      'warn',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-with': 'warn',
    'no-whitespace-before-property': 'warn',
    'require-yield': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    strict: ['warn', 'never'],
    'unicode-bom': ['warn', 'never'],
    'use-isnan': 'warn',
    'valid-typeof': 'warn',
    'no-restricted-properties': [
      'error',
      {
        object: 'require',
        property: 'ensure',
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
      },
      {
        object: 'System',
        property: 'import',
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
      },
    ],
    'getter-return': 'warn',

    // PLUGINS
    // to use a rule from a plugin please add and load them first in EslintPluginRules

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': [
      'warn',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-typos': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/style-prop-object': 'warn',

    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/accessible-emoji': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['noHref', 'invalidHref'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/heading-has-content': 'warn',
    'jsx-a11y/iframe-has-title': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-distracting-elements': 'warn',
    'jsx-a11y/no-redundant-roles': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/scope': 'warn',
  },
  settings: {
    react: {
      version: '17.0.0-rc.1',
    },
  },
}

const EslintPluginReactRules = {
  'react/jsx-boolean-value': require('eslint-plugin-react/lib/rules/jsx-boolean-value'),
  'react/jsx-child-element-spacing': require('eslint-plugin-react/lib/rules/jsx-child-element-spacing'),
  'react/jsx-closing-bracket-location': require('eslint-plugin-react/lib/rules/jsx-closing-bracket-location'),
  'react/jsx-closing-tag-location': require('eslint-plugin-react/lib/rules/jsx-closing-tag-location'),
  'react/jsx-curly-brace-presence': require('eslint-plugin-react/lib/rules/jsx-curly-brace-presence'),
  'react/jsx-curly-newline': require('eslint-plugin-react/lib/rules/jsx-curly-newline'),
  'react/jsx-curly-spacing': require('eslint-plugin-react/lib/rules/jsx-curly-spacing'),
  'react/jsx-equals-spacing': require('eslint-plugin-react/lib/rules/jsx-equals-spacing'),
  'react/jsx-filename-extension': require('eslint-plugin-react/lib/rules/jsx-filename-extension'),
  'react/jsx-first-prop-new-line': require('eslint-plugin-react/lib/rules/jsx-first-prop-new-line'),
  'react/jsx-fragments': require('eslint-plugin-react/lib/rules/jsx-fragments'),
  'react/jsx-handler-names': require('eslint-plugin-react/lib/rules/jsx-handler-names'),
  'react/jsx-indent': require('eslint-plugin-react/lib/rules/jsx-indent'),
  'react/jsx-indent-props': require('eslint-plugin-react/lib/rules/jsx-indent-props'),
  'react/jsx-key': require('eslint-plugin-react/lib/rules/jsx-key'),
  'react/jsx-max-depth': require('eslint-plugin-react/lib/rules/jsx-max-depth'),
  'react/jsx-max-props-per-line': require('eslint-plugin-react/lib/rules/jsx-max-props-per-line'),
  'react/jsx-no-bind': require('eslint-plugin-react/lib/rules/jsx-no-bind'),
  'react/jsx-no-comment-textnodes': require('eslint-plugin-react/lib/rules/jsx-no-comment-textnodes'),
  'react/jsx-no-duplicate-props': require('eslint-plugin-react/lib/rules/jsx-no-duplicate-props'),
  'react/jsx-no-literals': require('eslint-plugin-react/lib/rules/jsx-no-literals'),
  'react/jsx-no-script-url': require('eslint-plugin-react/lib/rules/jsx-no-script-url'),
  'react/jsx-no-target-blank': require('eslint-plugin-react/lib/rules/jsx-no-target-blank'),
  'react/jsx-no-undef': require('eslint-plugin-react/lib/rules/jsx-no-undef'),
  'react/jsx-no-useless-fragment': require('eslint-plugin-react/lib/rules/jsx-no-useless-fragment'),
  'react/jsx-one-expression-per-line': require('eslint-plugin-react/lib/rules/jsx-one-expression-per-line'),
  'react/jsx-pascal-case': require('eslint-plugin-react/lib/rules/jsx-pascal-case'),
  'react/jsx-props-no-multi-spaces': require('eslint-plugin-react/lib/rules/jsx-props-no-multi-spaces'),
  'react/jsx-props-no-spreading': require('eslint-plugin-react/lib/rules/jsx-props-no-spreading'),
  'react/jsx-sort-default-props': require('eslint-plugin-react/lib/rules/jsx-sort-default-props'),
  'react/jsx-sort-props': require('eslint-plugin-react/lib/rules/jsx-sort-props'),
  'react/jsx-space-before-closing': require('eslint-plugin-react/lib/rules/jsx-space-before-closing'),
  'react/jsx-tag-spacing': require('eslint-plugin-react/lib/rules/jsx-tag-spacing'),
  'react/jsx-uses-react': require('eslint-plugin-react/lib/rules/jsx-uses-react'),
  'react/jsx-uses-vars': require('eslint-plugin-react/lib/rules/jsx-uses-vars'),
  'react/jsx-wrap-multilines': require('eslint-plugin-react/lib/rules/jsx-wrap-multilines'),
  'react/boolean-prop-naming': require('eslint-plugin-react/lib/rules/boolean-prop-naming'),
  'react/button-has-type': require('eslint-plugin-react/lib/rules/button-has-type'),
  'react/default-props-match-prop-types': require('eslint-plugin-react/lib/rules/default-props-match-prop-types'),
  'react/destructuring-assignment': require('eslint-plugin-react/lib/rules/destructuring-assignment'),
  'react/display-name': require('eslint-plugin-react/lib/rules/display-name'),
  'react/forbid-component-props': require('eslint-plugin-react/lib/rules/forbid-component-props'),
  'react/forbid-dom-props': require('eslint-plugin-react/lib/rules/forbid-dom-props'),
  'react/forbid-elements': require('eslint-plugin-react/lib/rules/forbid-elements'),
  'react/forbid-foreign-prop-types': require('eslint-plugin-react/lib/rules/forbid-foreign-prop-types'),
  'react/forbid-prop-types': require('eslint-plugin-react/lib/rules/forbid-prop-types'),
  'react/function-component-definition': require('eslint-plugin-react/lib/rules/function-component-definition'),
  'react/no-access-state-in-setstate': require('eslint-plugin-react/lib/rules/no-access-state-in-setstate'),
  'react/no-adjacent-inline-elements': require('eslint-plugin-react/lib/rules/no-adjacent-inline-elements'),
  'react/no-array-index-key': require('eslint-plugin-react/lib/rules/no-array-index-key'),
  'react/no-children-prop': require('eslint-plugin-react/lib/rules/no-children-prop'),
  'react/no-danger': require('eslint-plugin-react/lib/rules/no-danger'),
  'react/no-danger-with-children': require('eslint-plugin-react/lib/rules/no-danger-with-children'),
  'react/no-deprecated': require('eslint-plugin-react/lib/rules/no-deprecated'),
  'react/no-did-mount-set-state': require('eslint-plugin-react/lib/rules/no-did-mount-set-state'),
  'react/no-did-update-set-state': require('eslint-plugin-react/lib/rules/no-did-update-set-state'),
  'react/no-direct-mutation-state': require('eslint-plugin-react/lib/rules/no-direct-mutation-state'),
  'react/no-find-dom-node': require('eslint-plugin-react/lib/rules/no-find-dom-node'),
  'react/no-is-mounted': require('eslint-plugin-react/lib/rules/no-is-mounted'),
  'react/no-multi-comp': require('eslint-plugin-react/lib/rules/no-multi-comp'),
  'react/no-redundant-should-component-update': require('eslint-plugin-react/lib/rules/no-redundant-should-component-update'),
  'react/no-render-return-value': require('eslint-plugin-react/lib/rules/no-render-return-value'),
  'react/no-set-state': require('eslint-plugin-react/lib/rules/no-set-state'),
  'react/no-string-refs': require('eslint-plugin-react/lib/rules/no-string-refs'),
  'react/no-this-in-sfc': require('eslint-plugin-react/lib/rules/no-this-in-sfc'),
  'react/no-typos': require('eslint-plugin-react/lib/rules/no-typos'),
  'react/no-unescaped-entities': require('eslint-plugin-react/lib/rules/no-unescaped-entities'),
  'react/no-unknown-property': require('eslint-plugin-react/lib/rules/no-unknown-property'),
  'react/no-unsafe': require('eslint-plugin-react/lib/rules/no-unsafe'),
  'react/no-unused-prop-types': require('eslint-plugin-react/lib/rules/no-unused-prop-types'),
  'react/no-unused-state': require('eslint-plugin-react/lib/rules/no-unused-state'),
  'react/no-will-update-set-state': require('eslint-plugin-react/lib/rules/no-will-update-set-state'),
  'react/prefer-es6-class': require('eslint-plugin-react/lib/rules/prefer-es6-class'),
  'react/prefer-read-only-props': require('eslint-plugin-react/lib/rules/prefer-read-only-props'),
  'react/prefer-stateless-function': require('eslint-plugin-react/lib/rules/prefer-stateless-function'),
  'react/prop-types': require('eslint-plugin-react/lib/rules/prop-types'),
  'react/react-in-jsx-scope': require('eslint-plugin-react/lib/rules/react-in-jsx-scope'),
  'react/require-default-props': require('eslint-plugin-react/lib/rules/require-default-props'),
  'react/require-optimization': require('eslint-plugin-react/lib/rules/require-optimization'),
  'react/require-render-return': require('eslint-plugin-react/lib/rules/require-render-return'),
  'react/self-closing-comp': require('eslint-plugin-react/lib/rules/self-closing-comp'),
  'react/sort-comp': require('eslint-plugin-react/lib/rules/sort-comp'),
  'react/sort-prop-types': require('eslint-plugin-react/lib/rules/sort-prop-types'),
  'react/state-in-constructor': require('eslint-plugin-react/lib/rules/state-in-constructor'),
  'react/static-property-placement': require('eslint-plugin-react/lib/rules/static-property-placement'),
  'react/style-prop-object': require('eslint-plugin-react/lib/rules/style-prop-object'),
  'react/void-dom-elements-no-children': require('eslint-plugin-react/lib/rules/void-dom-elements-no-children'),
}

const EslintPluginReactHooksRules = {
  'react-hooks/exhaustive-deps': require('eslint-plugin-react-hooks').rules['exhaustive-deps'],
  'react-hooks/rules-of-hooks': require('eslint-plugin-react-hooks').rules['rules-of-hooks'],
}

const EslintPluginImportRules = {
  'import/first': require('eslint-plugin-import/lib/rules/first'),
  'import/no-amd': require('eslint-plugin-import/lib/rules/no-amd'),
  'import/no-webpack-loader-syntax': require('eslint-plugin-import/lib/rules/no-webpack-loader-syntax'),
}

const EslintPluginJsxA11yRules = {
  'jsx-a11y/accessible-emoji': require('eslint-plugin-jsx-a11y/lib/rules/accessible-emoji'),
  'jsx-a11y/alt-text': require('eslint-plugin-jsx-a11y/lib/rules/alt-text'),
  'jsx-a11y/anchor-has-content': require('eslint-plugin-jsx-a11y/lib/rules/anchor-has-content'),
  'jsx-a11y/anchor-is-valid': require('eslint-plugin-jsx-a11y/lib/rules/anchor-is-valid'),
  'jsx-a11y/aria-activedescendant-has-tabindex': require('eslint-plugin-jsx-a11y/lib/rules/aria-activedescendant-has-tabindex'),
  'jsx-a11y/aria-props': require('eslint-plugin-jsx-a11y/lib/rules/aria-props'),
  'jsx-a11y/aria-proptypes': require('eslint-plugin-jsx-a11y/lib/rules/aria-proptypes'),
  'jsx-a11y/aria-role': require('eslint-plugin-jsx-a11y/lib/rules/aria-role'),
  'jsx-a11y/aria-unsupported-elements': require('eslint-plugin-jsx-a11y/lib/rules/aria-unsupported-elements'),
  'jsx-a11y/heading-has-content': require('eslint-plugin-jsx-a11y/lib/rules/heading-has-content'),
  'jsx-a11y/iframe-has-title': require('eslint-plugin-jsx-a11y/lib/rules/iframe-has-title'),
  'jsx-a11y/img-redundant-alt': require('eslint-plugin-jsx-a11y/lib/rules/img-redundant-alt'),
  'jsx-a11y/no-access-key': require('eslint-plugin-jsx-a11y/lib/rules/no-access-key'),
  'jsx-a11y/no-distracting-elements': require('eslint-plugin-jsx-a11y/lib/rules/no-distracting-elements'),
  'jsx-a11y/no-redundant-roles': require('eslint-plugin-jsx-a11y/lib/rules/no-redundant-roles'),
  'jsx-a11y/role-has-required-aria-props': require('eslint-plugin-jsx-a11y/lib/rules/role-has-required-aria-props'),
  'jsx-a11y/role-supports-aria-props': require('eslint-plugin-jsx-a11y/lib/rules/role-supports-aria-props'),
  'jsx-a11y/scope': require('eslint-plugin-jsx-a11y/lib/rules/scope'),
}

export const EslintPluginRules = {
  ...EslintPluginReactRules,
  ...EslintPluginReactHooksRules,
  ...EslintPluginImportRules,
  ...EslintPluginJsxA11yRules,
}
