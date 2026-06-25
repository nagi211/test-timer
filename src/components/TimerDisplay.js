import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/theme';

export function TimerDisplay({ displayTime, elapsed }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevDisplayRef = useRef(displayTime);

  useEffect(() => {
    if (displayTime !== prevDisplayRef.current) {
      prevDisplayRef.current = displayTime;
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [displayTime, scaleAnim]);

  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;
  const formatted =
    minutes > 0
      ? `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${displayTime}`;
  const unit = minutes > 0 ? '' : 's';

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Text style={styles.timerText}>
          {formatted}
          <Text style={styles.unit}>{unit}</Text>
        </Text>
      </Animated.View>
      <Text style={styles.subText}>actual: {elapsed.toFixed(1)}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: typography.timerFontSize,
    fontWeight: typography.timerFontWeight,
    color: colors.timerText,
    textShadowColor: colors.timerTextShadow,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    letterSpacing: -2,
  },
  unit: {
    fontSize: typography.unitFontSize,
    fontWeight: '600',
    color: colors.timerText,
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.subText,
    fontWeight: '500',
  },
});
