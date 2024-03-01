import React, { useState, useEffect } from 'react';

function Count() {
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(null);
  let oscillator = null;
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const start = () => {
    // カウントダウンが0でない場合にのみカウントダウンを開始する
    if (countdown > 0 && timer === null) {
      setTimer(setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000));
    }
  };

  const reset = () => {
    setCountdown(5);
    clearInterval(timer);
    setTimer(null);
  };

  useEffect(() => {
    // カウントダウンが0になったらタイマーをクリアする
    if (countdown === 0) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [countdown, timer]);
  
  // countdown が 0 になった後に実行するため、countdown の値を監視せず、timer だけを監視する
  useEffect(() => {
    // timer が null でなく、countdown が 0 の場合にのみサウンドを再生する
    if (timer !== null && countdown === 0) {
      for (let i = 0; i < 10; i++) {
        playSound(2000, 100);
      }
    }
  }, [timer]);
  

  const playSound = (frequency, duration) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // 波形を指定（ここではサイン波）
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 周波数を設定
    oscillator.connect(audioContext.destination); // 出力に接続
    oscillator.start();        
    // サウンド再生が終了した後にバイブレーションを再生
    setTimeout(() => {
      oscillator.stop(); // サウンド再生停止
      vibrate(); // バイブレーション再生
    }, duration);
  };

  const vibrate = () => {
    if ("vibrate" in navigator) {
      // バイブレーションを開始する
      const pattern = [200, 200, 200, 200, 1000, 2000,200];
      navigator.vibrate(pattern);    }
  };

  return (
    <div>
      <button onClick={start}>スタート</button>
      <button onClick={reset}>リセット</button>
      <div id="countdown">{countdown}</div>
    </div>
  );
}

export default Count;
