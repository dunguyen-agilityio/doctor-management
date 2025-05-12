import { useEffect } from 'react';

const appStartTime = Date.now();

export const useMeasureTTI = () => {
  useEffect(() => {
    if (__DEV__) {
      const interactiveTime = Date.now();
      const tti = interactiveTime - appStartTime;
      console.log('Time to Interactive (TTI):', tti, 'ms');
    }
  }, []);
};
