import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from './TimerDisplay';
import { ControlButtons } from './ControlButtons';
import { colors } from '../constants/theme';

export function TimerScreen() {
  const { elapsed, displayTime, isRunning, start, pause, reset } = useTimer();

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.gradient}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>Timer</Text>
          <View style={styles.displayWrapper}>
            <TimerDisplay displayTime={displayTime} elapsed={elapsed} />
          </View>
          <View style={styles.controlsWrapper}>
            <ControlButtons
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />
          </View>
          <Text style={styles.hint}>Display updates every 2 seconds</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    position: 'absolute',
    top: 24,
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  displayWrapper: { marginBottom: 64 },
  controlsWrapper: { width: '100%' },
  hint: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});
