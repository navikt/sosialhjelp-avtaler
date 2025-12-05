/* eslint-env node */
// Mock parse5 to avoid ESM import issues in Jest
// eslint-disable-next-line no-undef
module.exports = {
  Parser: class Parser {},
  parse: () => ({}),
  parseFragment: () => ({}),
  serialize: () => '',
};
