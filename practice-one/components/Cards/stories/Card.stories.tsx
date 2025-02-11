import { storiesOf } from '@storybook/react-native';
import React from 'react';

import CenterView from '@mstorybook/stories/CenterView';
import Card from '../Card';
import { MOCK_ARTICLES } from '@__mock__';

const acticleFirst = MOCK_ARTICLES[0];
const { name = 'The Food', image = '' } = acticleFirst;

storiesOf('Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <Card
      title={name}
      image={image}
      backgroundColor={['', '']}
      color="green"
      id={1}
    />
  ))
  .add('secondary', () => (
    <Card
      title={name}
      image={image}
      backgroundColor={['', '']}
      color="green"
      id={1}
    />
  ));
