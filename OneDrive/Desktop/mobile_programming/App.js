import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import CinnamorollContentPlayground from './components/CinnamorollContentPlayground';
import MiniFormValidator from './components/MiniFormValidator';
import CatchTheButtonGame from './components/CatchTheButton';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'contentEditor':
        return <CinnamorollContentPlayground />;
      case 'miniFormValidator':
        return <MiniFormValidator />;
      case 'catchTheButtonGame':
        return <CatchTheButtonGame />;
      default:
        return (
          <View style={styles.homeContainer}>
            <Text style={styles.title}>My-APP</Text>
            <Text style={styles.subtitle}>Choose an activity to practice</Text>
            <TouchableOpacity
              style={styles.activityButton}
              onPress={() => setActiveScreen('contentEditor')}
            >
              <Text style={styles.buttonText}>1. Content Editor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activityButton}
              onPress={() => setActiveScreen('miniFormValidator')}
            >
              <Text style={styles.buttonText}>2. Mini Form Validator</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activityButton}
              onPress={() => setActiveScreen('catchTheButtonGame')}
            >
              <Text style={styles.buttonText}>3. Catch the Button Game</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {activeScreen !== 'home' && (
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveScreen('home')}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
      )}
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  homeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  activityButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default App;