import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailsScreen from '@/screens/Details';

import { ROUTES } from '@/constants';

import TabNavigator, { TabParamsList } from './TabNavigator';

export type RootStackParamsList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.DETAIL]: {
    id: string;
  };
} & TabParamsList;

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name={ROUTES.ROOT} component={TabNavigator} />
        <RootStack.Screen name={ROUTES.DETAIL} component={DetailsScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
