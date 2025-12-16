import { useState, useEffect } from "react";

export function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  startValue: number = 0
): number {
  const [value, setValue] = useState(startValue);

  useEffect(() => {
    const startTime = Date.now();
    const difference = endValue - startValue;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValue + difference * easeOutQuart;
      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setValue(endValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [endValue, duration, startValue]);

  return value;
}
