import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

function AnimatedButton({ label, onPress, style }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.button, style]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function ControlButtons({ isRunning, onStart, onPause, onReset }) {
  return (
    <View style={styles.row}>
      {!isRunning ? (
        <AnimatedButton label="Start" onPress={onStart} style={styles.startButton} />
      ) : (
        <AnimatedButton label="Pause" onPress={onPause} style={styles.pauseButton} />
      )}
      <AnimatedButton label="Reset" onPress={onReset} style={styles.resetButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.buttonGap,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: spacing.buttonWidth,
    height: spacing.buttonHeight,
    borderRadius: spacing.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: typography.buttonFontSize,
    fontWeight: typography.buttonFontWeight,
    letterSpacing: 0.5,
  },
  startButton: { backgroundColor: colors.buttonStart },
  pauseButton: { backgroundColor: colors.buttonPause },
  resetButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
