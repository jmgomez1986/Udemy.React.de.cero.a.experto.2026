import { useEffect, useEffectEvent, useState } from 'react';

const colors: Record<string, string> = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};
type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = (initialColor: TrafficLightColor) => {
  const [light, setlight] = useState<TrafficLightColor>(initialColor);
  const [countdown, setCountdown] = useState(5);

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) return;
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  // Change Light color effect
  const setLightAction = useEffectEvent(() => {
    const nextLight: Record<TrafficLightColor, TrafficLightColor> = {
      red: 'green',
      green: 'yellow',
      yellow: 'red',
    };

    setCountdown(5);
    setlight(nextLight[light]);
  });

  useEffect(() => {
    if (countdown > 0) return;

    setLightAction();
  }, [countdown]);

  return {
    // Props
    countdown,
    light,
    colors,
    // Computed
    percentage: (countdown / 5) * 100,
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    redLight: light === 'red' ? colors.red : 'bg-gray-500',
    // Methods
  };
};
