import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const CinnamorollContentPlayground = () => {
  const [message, setMessage] = useState("Hi there! I'm Cinnamoroll's special paragraph. Try customizing me using the tools below.");
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [textColor, setTextColor] = useState('#000');
  const [inputText, setInputText] = useState('');
  const [inputColor, setInputColor] = useState('');

  const handleShowHide = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleApplyMessage = () => {
    if (inputText.trim()) {
      setMessage(inputText.trim());
      setIsContentVisible(true);
      setInputText('');
    }
  };

  const handleApplyColor = () => {
    if (inputColor.trim()) {
      setTextColor(inputColor.trim());
      setInputColor('');
    }
  };

  const handleReset = () => {
    setMessage("Hi there! I'm Cinnamoroll's special paragraph. Try customizing me using the tools below.");
    setIsContentVisible(true);
    setTextColor('#000');
    setInputText('');
    setInputColor('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cinnamoroll Playground</Text>
          <Image
            source={{ uri: 'https://cdn.dribbble.com/users/934989/screenshots/5923838/cinnamoroll_gif.gif' }}
            style={styles.cinnamorollImage}
          />
        </View>

        <View style={styles.editor}>
          <View style={styles.playContentContainer}>
            {isContentVisible && (
              <Text style={[styles.playContent, { color: textColor }]}>
                {message}
              </Text>
            )}
            {!isContentVisible && <Text style={styles.playContent}>Content is hidden</Text>}
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={handleShowHide}>
              <Text style={styles.buttonText}>{isContentVisible ? 'Hide Content' : 'Show Content'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controls}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new message..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleApplyMessage}
            />
            <TouchableOpacity style={styles.button} onPress={handleApplyMessage}>
              <Text style={styles.buttonText}>Apply Text</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controls}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter a color (e.g., #ff6b6b)"
              value={inputColor}
              onChangeText={setInputColor}
              onSubmitEditing={handleApplyColor}
            />
            <TouchableOpacity style={styles.button} onPress={handleApplyColor}>
              <Text style={styles.buttonText}>Apply Color</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cinnamorollImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  editor: {
    width: '100%',
    maxWidth: 760,
  },
  playContentContainer: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  playContent: {
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1565c0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  textInput: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
  },
});

export default CinnamorollContentPlayground;