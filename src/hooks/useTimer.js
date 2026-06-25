import { useState, useRef, useEffect, useCallback } from 'react';

const TICK_INTERVAL_MS = 1000;
const UI_STEP_SECONDS = 2;

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimestampRef = useRef(null);
  const accumulatedRef = useRef(0);
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    if (startTimestampRef.current === null) return;
    const nowMs = Date.now();
    const currentElapsed =
      accumulatedRef.current + (nowMs - startTimestampRef.current) / 1000;
    setElapsed(currentElapsed);
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    startTimestampRef.current = Date.now();
    setIsRunning(true);
    intervalRef.current = setInterval(tick, TICK_INTERVAL_MS);
  }, [tick]);

  const pause = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (startTimestampRef.current !== null) {
      accumulatedRef.current +=
        (Date.now() - startTimestampRef.current) / 1000;
      startTimestampRef.current = null;
    }
    setIsRunning(false);
    setElapsed(accumulatedRef.current);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    startTimestampRef.current = null;
    accumulatedRef.current = 0;
    setElapsed(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const displayTime = Math.floor(elapsed / UI_STEP_SECONDS) * UI_STEP_SECONDS;

  return { elapsed, displayTime, isRunning, start, pause, reset };
}
