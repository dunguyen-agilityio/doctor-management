import { StyleSheet } from 'react-native';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootNavigator } from '@/navigation';

import { Loading } from '@/components';

import { COLOR } from '@/constants';

import useNotify from '@/hooks/useNotify';

const queryClient = new QueryClient();

const prefix = Linking.createURL('/');
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: 'home',
      About: 'about',
    },
  },
};

const App = () => {
  useNotify();

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <NavigationContainer
          linking={linking}
          fallback={<Loading fullScreen />}
        >
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

let AppEntryPoint = App;

if (__DEV__ && Constants.expoConfig?.extra?.storybook) {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});
