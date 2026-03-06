module.exports = {
  root: true,
  env: {
    es6: true,
    node: true, // This enables Node.js globals
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "no-unused-vars": "off", // Disable unused var warnings (optional)
  },
};