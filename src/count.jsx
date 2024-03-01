import React, { useState, useEffect } from 'react';

function Count() {
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(null);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const start = () => {
    if (countdown > 0 && timer === null) {
      setTimer(setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000));
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      repeat(10);
      clearInterval(timer);
      setTimer(null);
    }
  }, [countdown, timer]);

  const playSound = (frequency, duration) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); 
    oscillator.connect(audioContext.destination); 
    oscillator.start();
    setTimeout(() => {
      oscillator.stop(); 
      vibrate();
    }, duration);
  };

  const vibrate = () => {
    if ("vibrate" in navigator) {
      const pattern = [200, 200, 200, 200, 1000, 2000];
      navigator.vibrate(pattern);
    }
  };

  const repeat = (repeatNum) => {
    for (let i = 0; i < repeatNum; i++) {
      setTimeout(() => {
        playSound(2000, 100);
        // if (i === repeatNum - 1) {
        //   setTimeout(vibrate, 100); // 最後の音が終了した後にバイブレーションを再生
        // }
      }, i * 4000); // 音を連続して再生するために、再生間隔を少し開ける
    }
  };

  return (
    <div>
      <button onClick={start}>スタート</button>
      <div id="countdown">{countdown}</div>
    </div>
  );
}

export default Count;
