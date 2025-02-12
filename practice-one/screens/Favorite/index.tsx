import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';

import { FoodsContainer, FoodsList, NotFound, SearchInput } from '@components';

import {
  favoriteIdsSelector,
  favoriteQuerySelector,
  useFilterStore,
} from '@stores';

const FavoriteScreen = () => {
  const setFilter = useFilterStore(({ setFilter }) => setFilter);

  useFocusEffect(() => {
    return () => {
      setFilter({ favoriteQuery: '' });
    };
  });

  const handleSearch = (query: string) => {
    setFilter({ favoriteQuery: query });
  };

  return (
    <FoodsContainer
      style={styles.container}
      favorite={1}
      getQuery={favoriteQuerySelector}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SearchInput
          onChangeQuery={handleSearch}
          getQuery={favoriteQuerySelector}
        />
        <FoodsList
          idsSelector={favoriteIdsSelector}
          emptyContent={<NotFound />}
          style={styles.list}
        />
      </ScrollView>
    </FoodsContainer>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 62,
  },
  list: {
    marginTop: 24,
    width: '100%',
  },
});
