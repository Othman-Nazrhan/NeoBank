const React = require('react');

module.exports = {
  View: ({ children, ...props }) => React.createElement('div', props, children),
  Text: ({ children, ...props }) => React.createElement('span', props, children),
  StyleSheet: {
    create: (styles) => styles,
    flatten: (styles) => styles,
  },
  Platform: {
    OS: 'ios',
  },
};
