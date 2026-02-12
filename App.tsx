import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Platform } from 'react-native';

const BACKGROUND_COLOR = '#F0F4F2';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BACKGROUND_COLOR}
        translucent={Platform.OS === 'android'}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Hello, welcome to FieldPro App!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
