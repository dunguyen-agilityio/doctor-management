import { Image, StyleSheet } from 'react-native';

export const EmptyImage = () => (
  <Image
    source={require('@/assets/images/empty_2x.png')}
    style={styles.empty}
  />
);

export const NotFoundImage = () => (
  <Image
    source={require('@/assets/images/not_found_2x.png')}
    style={styles.notFound}
    testID="not-found-image"
  />
);

export const Logo = () => (
  <Image source={require('@/assets/images/logo.png')} style={styles.loading} />
);

export const ArrowICon = () => (
  <Image source={require('@/assets/icons/arrow.png')} />
);

export const QuestionIcon = () => (
  <Image source={require('@/assets/icons/question.png')} />
);

export const SearchIcon = () => (
  <Image source={require('@/assets/icons/iconsearch.png')} />
);

export const FavoriteMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@/assets/icons/favoritefill.png')
    : require('@/assets/icons/favorite.png');
  return <Image source={path} />;
};

export const HomeMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@/assets/icons/homefill.png')
    : require('@/assets/icons/home.png');
  return <Image source={path} />;
};

export const SearchMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@/assets/icons/searchfill.png')
    : require('@/assets/icons/search.png');
  return <Image source={path} />;
};

export const SplashImage = () => (
  <Image
    source={require('@/assets/images/pattern.png')}
    style={styles.topImage}
  />
);

export const styles = StyleSheet.create({
  empty: {
    height: 96,
    width: 108,
  },
  notFound: {
    width: 96,
    height: 96,
  },
  loading: {
    width: 122,
    height: 122,
  },
  topImage: {
    width: '100%',
    resizeMode: 'cover',
  },
});
