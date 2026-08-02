import { useState, useEffect } from 'react';

export function useDeviceDetect() {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        setIsIOS(true);
      } else if (/android/i.test(userAgent)) {
        setIsAndroid(true);
      } else {
        // Fallback for testing/desktop - default to Android/Chrome instructions
        setIsAndroid(true);
      }
    }
  }, []);

  return { isIOS, isAndroid };
}
