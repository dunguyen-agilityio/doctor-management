import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFoods } from '@hooks';
import { RootScreenNavigationProps } from '@navigation';
import { Header, Search, Cards, Categories, Text } from '@components';
import { SEARCH, HOME, COLORS } from '@constants';
import { FoodsList } from '@components/Foods';

const HomeScreen = () => {
  const { navigate } = useNavigation<RootScreenNavigationProps<typeof HOME>>();
  const { options, setOptions } = useFoods();

  const handleChangeTag = (ids: number[]) => {
    setOptions((prev) => ({ ...prev, categories: ids }));
  };

  const handleFocusSearch = useCallback(() => {
    navigate(SEARCH);
    return false;
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Header />
      <Search onFocus={handleFocusSearch} isFocus={false} />
      <Categories onSelect={handleChangeTag} select={options.categories} />
      <Cards />
      <FoodsList
        slots={{ list: { horizontal: true } }}
        title={
          <Text
            fontSize="xxl-0"
            fontWeight="700"
            customStyle={{ marginTop: 22, marginLeft: 8 }}
          >
            All Food
          </Text>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: COLORS.WHITE,
  },
});
