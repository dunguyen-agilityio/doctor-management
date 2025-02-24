import { Image, StyleSheet } from 'react-native';

export const EmptyImage = () => (
  <Image source={require('@assets/images/empty.png')} style={styles.empty} />
);

export const NotFoundImage = () => (
  <Image
    source={require('@assets/images/not-found.png')}
    style={styles.notFound}
    testID="not-found-image"
  />
);

export const Logo = () => (
  <Image source={require('@assets/images/logo.png')} style={styles.loading} />
);

export const ArrowRightBoldICon = () => (
  <Image source={require('@assets/icons/arrow-right-bold.png')} />
);

export const QuestionIcon = () => (
  <Image source={require('@assets/icons/question.png')} />
);

export const SearchIcon = () => (
  <Image source={require('@assets/icons/icon-search.png')} />
);

export const FavoriteMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@assets/icons/favorite-fill.png')
    : require('@assets/icons/favorite.png');
  return <Image source={path} />;
};

export const HomeMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@assets/icons/home-fill.png')
    : require('@assets/icons/home.png');
  return <Image source={path} />;
};

export const SearchMenu = ({ isFill = false }: { isFill?: boolean }) => {
  const path = isFill
    ? require('@assets/icons/search-fill.png')
    : require('@assets/icons/search.png');
  return <Image source={path} />;
};

export const SplashImage = () => (
  <Image
    source={require('@assets/images/pattern.png')}
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
