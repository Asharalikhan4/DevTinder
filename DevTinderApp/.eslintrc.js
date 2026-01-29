module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    // Allows both double quotes and backticks, but errors on single quotes
    quotes: ["error", "double", {allowTemplateLiterals: true}],

    // Keeps double quotes as the requirement for JSX attributes
    "jsx-quotes": ["error", "prefer-double"],
  },
};
