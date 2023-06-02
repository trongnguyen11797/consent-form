import { useRef, useState } from 'react';
import { PropsType } from 'src/models/play-audio-item.model';

const AudioPlay = (props: PropsType) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(props.isPlay || false);

  const onPlay = () => {
    if (isPlay) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlay(!isPlay);
  };

  const onTimeUpdate = () => {
    let currentTime = audioRef.current?.currentTime;
    const duration = audioRef.current?.duration;
    if (currentTime === duration) {
      setIsPlay(false);
      currentTime = 0;
    }
  };

  return (
    <>
      <button className='btn__record btn__common' onClick={onPlay}>
        {isPlay ? <i className='fa-solid fa-pause'></i> : <i className='fa-solid fa-play'></i>}
      </button>
      <audio ref={audioRef} src={props.audioUrl || ''} onTimeUpdate={onTimeUpdate}></audio>
    </>
  );
};

export default AudioPlay;
