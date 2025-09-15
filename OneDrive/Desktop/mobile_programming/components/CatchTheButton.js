import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const randomBrightColor = () => {
  const colors = ["#ff4c4c", "#ff9800", "#4caf50", "#2196f3", "#9c27b0"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const CatchTheButtonGame = () => {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [status, setStatus] = useState("Press 'Start Game' to begin!");
  const [buttonColor, setButtonColor] = useState(randomBrightColor());
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const timeoutRef = useRef(null);
  const playAreaRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Simulate localStorage for high score
  const loadHighScore = async () => {
    // In a real app, you'd use AsyncStorage or another persistent storage solution.
    // For this example, we'll just use a simple state.
    // const storedHighScore = await AsyncStorage.getItem('catchGameHighScore');
    // if (storedHighScore) {
    //   setHighScore(parseInt(storedHighScore));
    // }
  };

  useEffect(() => {
    loadHighScore();
  }, []);

  const setRandomPosition = () => {
    if (!playAreaRef.current) return;
    playAreaRef.current.measure((x, y, playAreaWidth, playAreaHeight) => {
      const btnWidth = 120;
      const btnHeight = 50;
      const maxLeft = playAreaWidth - btnWidth;
      const maxTop = playAreaHeight - btnHeight;

      const left = Math.floor(Math.random() * maxLeft);
      const top = Math.floor(Math.random() * maxTop);

      setButtonPosition({ top, left });
    });
  };

  const showButton = () => {
    if (!gameActive) return;

    setRandomPosition();
    setButtonColor(randomBrightColor());

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      // If the button is still visible, it's a miss
      if (fadeAnim.__getValue() === 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setMisses((prev) => prev + 1);
          setStatus("You missed!");
          setTimeout(showButton, 1000);
        });
      }
    }, 2000);
  };

  const handleCatch = () => {
    if (!gameActive) return;
    clearTimeout(timeoutRef.current);

    setScore((prev) => prev + 1);
    setStatus("Nice catch!");

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Confetti animation is complex in RN, so we will skip it for this example or use a library.
      // For a simple demo, we can just jump to the next button.
      setTimeout(showButton, 1000);
    });
  };

  const handleStartGame = () => {
    if (gameActive) return;
    setScore(0);
    setMisses(0);
    setStatus("Game started!");
    setGameActive(true);
    setTimeout(showButton, 1000);
  };

  const handleStopGame = () => {
    setGameActive(false);
    clearTimeout(timeoutRef.current);
    setStatus("Game stopped.");
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      // AsyncStorage.setItem('catchGameHighScore', score.toString());
    }
  }, [score, highScore]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.gameContainer}>
        <Text style={styles.title}>Catch the Button Game 🎯</Text>
        <View style={styles.playArea} ref={playAreaRef}>
          <Animated.View
            style={[
              styles.catchBtn,
              {
                backgroundColor: buttonColor,
                top: buttonPosition.top,
                left: buttonPosition.left,
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableOpacity onPress={handleCatch} style={styles.buttonTouchArea}>
              <Text style={styles.buttonText}>Catch Me!</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Misses: {misses}</Text>
        <Text style={styles.scoreText}>High Score: {highScore}</Text>
        <Text style={styles.statusText}>{status}</Text>

        <View style={styles.gameButtons}>
          <TouchableOpacity style={[styles.controlButton, styles.startButton]} onPress={handleStartGame}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.stopButton]} onPress={handleStopGame}>
            <Text style={styles.buttonText}>Stop Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  playArea: {
    position: 'relative',
    marginVertical: 15,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    width: width * 0.9,
    height: width * 0.9,
    overflow: 'hidden',
  },
  catchBtn: {
    position: 'absolute',
    borderRadius: 8,
  },
  buttonTouchArea: {
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#444',
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  gameButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
});

export default CatchTheButtonGame;