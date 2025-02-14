import { Button, StyleSheet, Text, View } from 'react-native';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary?: () => void;
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Something went wrong:</Text>
    <Text style={styles.errorMessage}>{error.message}</Text>
    <Button title="Try Again" onPress={resetErrorBoundary} />
  </View>
);

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F8D7DA', // Light red background for error indication
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721C24', // Dark red color for the title
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#721C24',
    textAlign: 'center',
    marginBottom: 15,
  },
});
