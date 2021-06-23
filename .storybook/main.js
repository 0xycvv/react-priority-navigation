const path = require('path');

module.exports = {
  stories: ['../**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-essentials',
      options: {
        viewport: false,
      },
    },
  ],
  logLevel: 'debug'
};