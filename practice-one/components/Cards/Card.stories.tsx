import { MOCK_ARTICLES } from '@__mock__';
import { storiesOf } from '@storybook/react-native';
import CenterView from '@storybook/stories/CenterView';

import Card from './Card';

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
