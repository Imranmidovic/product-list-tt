import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ProductListScreen} from './src/screen/product-list-screen';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ProductListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
