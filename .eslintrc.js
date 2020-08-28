module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    "import",
    "prettier",
    "@typescript-eslint",
    "simple-import-sort",
    "eslint-plugin-tsdoc"
  ],
  extends: [
    "node",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  overrides: [
    {
      files: ["*/__tests__/**/*.test.ts"],
      env: {
        "jest/globals": true
      },
      extends: [
        "plugin:jest/style",
        "plugin:jest/recommended",
        "plugin:jest-formatting/strict"
      ],
      plugins: ["jest", "jest-formatting"],
      rules: {
        "@typescript-eslint/no-misused-promises": "off",
        "jest/no-disabled-tests": "warn",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error"
      }
    }
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    quotes: "off",
    "sort-imports": "off",
    "no-unused-vars": "off",
    eqeqeq: ["error", "always"],
    "no-param-reassign": "error",
    "no-mixed-operators": "error",

    //
    // eslint-plugin-tsdoc
    //
    "tsdoc/syntax": "error",

    //
    // @typescript-eslint/eslint-plugin
    //

    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_" }
    ],

    //
    // eslint-plugin-prettier
    //

    "prettier/prettier": "error",

    //
    // eslint-plugin-simple-import-sort
    //

    "simple-import-sort/sort": "error",

    //
    // eslint-plugin-import
    //

    "import/named": "off",
    "import/no-named-export": "off",
    "import/no-nodejs-modules": "off",
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-unresolved": "error",
    "import/no-self-import": "error",
    "import/no-named-default": "error",
    "import/no-absolute-path": "error",
    "import/no-mutable-exports": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false
      }
    ]
  }
};
