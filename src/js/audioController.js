
class AudioController {
    playAudio(audio) {
        const audioObj = new Audio(audio.fileName);
        audioObj.volume = audio.volume;
        audioObj.preload = 'auto';
        audioObj.load();
        audioObj.play();
    }
};