import { Button, StyleSheet, Text, View } from 'react-native';

const ErrorFallback = ({
  error,
  onRetry,
}: {
  error: Error;
  onRetry?: () => void;
}) => (
  <View style={styles.container} testID="error-fallback">
    <Text style={styles.title}>Something went wrong:</Text>
    <Text style={styles.errorMessage}>{error.message}</Text>
    <Button title="Try Again" onPress={onRetry} />
  </View>
);

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F8D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721C24',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#721C24',
    textAlign: 'center',
    marginBottom: 15,
  },
});
