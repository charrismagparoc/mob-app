import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';

const MiniFormValidator = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const successDropAnim = useState(new Animated.Value(-100))[0];

  const validateField = (fieldName) => {
    switch (fieldName) {
      case 'name':
        if (!name.trim()) {
          setNameError('Name cannot be empty.');
        } else {
          setNameError('');
        }
        break;
      case 'email':
        if (!email.includes('@')) {
          setEmailError('Email must contain @.');
        } else {
          setEmailError('');
        }
        break;
      case 'age':
        if (isNaN(age) || parseInt(age) <= 0) {
          setAgeError('Age must be a positive number.');
        } else {
          setAgeError('');
        }
        break;
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!name.trim()) {
      setNameError('Name cannot be empty.');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!email.includes('@')) {
      setEmailError('Email must contain @.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (isNaN(age) || parseInt(age) <= 0) {
      setAgeError('Age must be a positive number.');
      isValid = false;
    } else {
      setAgeError('');
    }

    if (isValid) {
      setIsSuccessVisible(true);
      Animated.timing(successDropAnim, {
        toValue: 20,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(successDropAnim, {
            toValue: -100,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setIsSuccessVisible(false));
        }, 2000);
      });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAge('');
    setNameError('');
    setEmailError('');
    setAgeError('');
    setIsSuccessVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={[
            styles.successAnimation,
            {
              transform: [{ translateY: successDropAnim }],
              opacity: isSuccessVisible ? 1 : 0,
            },
          ]}>
          <Text style={styles.successText}>Form Submitted Successfully!</Text>
        </Animated.View>
        <View style={styles.formCard}>
          <Text style={styles.title}>Mini Form Validator</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onBlur={() => validateField('name')}
              placeholder="Enter your name"
            />
            {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => validateField('email')}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              onBlur={() => validateField('age')}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
            {ageError ? <Text style={styles.error}>{ageError}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF6347', marginTop: 15 }]} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    width: '100%',
    maxWidth: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#4facfe',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successAnimation: {
    position: 'absolute',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    elevation: 5,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MiniFormValidator;