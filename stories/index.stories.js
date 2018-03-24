import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PriorityNav from '../src/index';

storiesOf('Button', module).add('with some emoji', () => (
  <PriorityNav>
    <button>yoyo</button>
    <a>yoyo</a>
    <div>yoyo</div>
    <div>yoyo</div>
    <div>yoyo</div>
  </PriorityNav>
));
