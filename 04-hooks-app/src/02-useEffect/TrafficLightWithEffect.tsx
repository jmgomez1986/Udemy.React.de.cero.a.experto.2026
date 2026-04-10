import { useEffect, useEffectEvent, useState } from 'react';

const colors: Record<string, string> = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};
type TrafficLightColor = keyof typeof colors;

export const TrafficLightWithEffect = () => {
  const [light, setlight] = useState<TrafficLightColor>('red');
  const [countdown, setCountdown] = useState(5);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     setCountdown(5);
  //     if (light === 'red') {
  //       setlight('green');
  //       return;
  //     } else if (light === 'green') {
  //       setlight('yellow');
  //       return;
  //     } else if (light === 'yellow') {
  //       setlight('red');
  //       return;
  //     }
  //     return;
  //   }

  //   const intervalId = setInterval(() => {
  //     setCountdown((prev) => prev - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [countdown, light]);

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
    // setCountdown(5);
    // if (light === 'red') {
    //   setlight('green');
    // } else if (light === 'green') {
    //   setlight('yellow');
    // } else {
    //   setlight('red');
    // }
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-thin">
          Semaforo con useEffect
        </h1>
        <h2 className="text-white text-xl">Countdown: {countdown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
