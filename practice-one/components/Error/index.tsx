import { Button, Text, View } from 'react-native';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Something went wrong:</Text>
    <Text>{error.message}</Text>
    <Button title="Try Again" onPress={resetErrorBoundary} />
  </View>
);

export default ErrorFallback;
