import { addParameters, configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

// Option defaults:
addParameters({
  options: {
    panelPosition: 'right',
  },
});

configure(loadStories, module);
