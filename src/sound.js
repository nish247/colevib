function Sound(){
    let oscillator = null;
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(frequency, duration){
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; // 波形を指定（ここではサイン波）
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 周波数を設定
        oscillator.connect(audioContext.destination); // 出力に接続
        oscillator.start();        
        oscillator.stop(audioContext.currentTime + duration / 1000); // 正しく音を停止する
    }
}

export default Sound;