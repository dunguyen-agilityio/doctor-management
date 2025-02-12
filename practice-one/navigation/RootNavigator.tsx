import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailsScreen, SplashScreen } from '@screens';

import { ROUTES } from '@constants';

import TabNavigator, { TabParamsList } from './TabNavigator';

export type RootStackParamsList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.SPLASH]: undefined;
  [ROUTES.DETAIL]: {
    id: number;
  };
} & TabParamsList;

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();

  return (
    <RootStack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
    >
      <RootStack.Group>
        <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
        <RootStack.Screen name={ROUTES.ROOT} component={TabNavigator} />
        <RootStack.Screen name={ROUTES.DETAIL} component={DetailsScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
