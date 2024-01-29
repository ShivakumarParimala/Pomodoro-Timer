import React, { useState, useEffect } from 'react'; 
import clockalarm from './Sound.mp3';
import useSound from 'use-sound';
// import useSound from 'use-Sound';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [playAlarm] = useSound(clockalarm);
//   useSound

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer is done, you can add your alarm or notification logic here
          playAlarm()
          alert("Pomodoro completed!");
          clearInterval(timer);
          setIsActive(false);
          setMinutes(25);
          setSeconds(0);
        }
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const customizeTimer = (newMinutes) => {
    setIsActive(false);
    setMinutes(newMinutes);
    setSeconds(0);
  };

  return (
    <div>
      <div>
        <h1>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={() => customizeTimer(1)}>Customize (1 min)</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
