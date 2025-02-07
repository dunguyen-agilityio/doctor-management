import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FoodOptions, useFood, useFoods } from '@hooks';
import { RootScreenNavigationProps } from '@navigation';
import { Header, Search, Cards, Categories, Text } from '@components';
import { DETAIL, SEARCH, HOME, COLORS } from '@constants';
import { FoodsList } from '@components/Foods';

const HomeScreen = () => {
  const { navigate, goBack } =
    useNavigation<RootScreenNavigationProps<typeof HOME>>();
  const { data, fetch, setQuery, query } = useFoods();

  const { categories }: FoodOptions = query;

  const handlePressItem = useCallback(
    (id: number) => {
      navigate(DETAIL, { id, onChange: () => fetch(), onBack: () => goBack() });
    },
    [fetch, goBack, navigate]
  );

  const handleChangeTag = useCallback(
    (ids: number[]) => {
      if (ids) setQuery((prev) => ({ ...prev, categories: ids }));
    },
    [setQuery]
  );

  const handleFocusSearch = useCallback(() => {
    navigate(SEARCH);
    return false;
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Header />
      <Search onFocus={handleFocusSearch} isFocus={false} />
      <Categories onSelect={handleChangeTag} />
      <Cards />
      <FoodsList
        foods={data}
        onPressItem={handlePressItem}
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
