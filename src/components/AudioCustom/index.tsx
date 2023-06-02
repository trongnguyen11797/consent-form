import { useContext, useRef } from 'react';

import { capitalizeFirstLetter } from 'src/common/constant';
import { AudioCustomPropsType } from 'src/models/home.model';
import { FormContext } from 'src/providers/FormContext';

const AudioCustom = (props: AudioCustomPropsType) => {
  const { data } = useContext(FormContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = () => {
    if (props.isPlay) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    props.setIsPlay(!props.isPlay);
  };

  const onTimeUpdate = () => {
    let currentTime = audioRef.current?.currentTime;
    const duration = audioRef.current?.duration;
    if (currentTime === duration) {
      props.setIsPlay(false);
      currentTime = 0;
    }
  };

  const onSpeak = (type: 'play' | 'stop') => {
    if (type === 'play') {
      if (props.transcript) {
        props.onRetry();
      }
      props.SpeechRecognition.startListening({ continuous: true, language: data.language?.langCode });
      props.startRecording();
    } else {
      props.SpeechRecognition.stopListening();
      props.stopRecording();
    }
  };

  return (
    <div className={`record__box ${props.status === 'recording' ? 'recording' : ''}`}>
      {props.status === 'stopped' && props.isCheckSaid ? (
        <>
          <button className='btn__record btn__common' onClick={onPlay}>
            {props.isPlay ? <i className='fa-solid fa-pause'></i> : <i className='fa-solid fa-play'></i>}
          </button>
          <audio ref={audioRef} src={props.mediaBlobUrl || data.audioSrc || ''} onTimeUpdate={onTimeUpdate}></audio>
          {data.language?.langCode === 'en-US' && props.transcript && <p>You responded "{capitalizeFirstLetter(props.transcript)}"</p>}
          {data.language?.langCode === 'fr-FR' && props.transcript && <p>Vous avez répondu "{capitalizeFirstLetter(props.transcript)}"</p>}
        </>
      ) : (
        <div className='flex-center flex-column flex-gap-1'>
          {data.language?.langCode === 'en-US' && props.transcript && <p>You said: "{capitalizeFirstLetter(props.transcript)}"</p>}
          {data.language?.langCode === 'fr-FR' && props.transcript && <p>Vous avez dit: "{capitalizeFirstLetter(props.transcript)}"</p>}
          <button
            className='btn__record btn__common'
            onClick={() => {
              const type = props.status === 'recording' ? 'stop' : 'play';
              onSpeak(type);
            }}>
            <i className='fa-solid fa-microphone'></i>
          </button>
          {props.status === 'acquiring_media' && data.language?.langCode === 'en-US' && <p>Please await...</p>}
          {props.status === 'acquiring_media' && data.language?.langCode === 'fr-FR' && <p>Veuillez patienter...</p>}
        </div>
      )}
    </div>
  );
};

export default AudioCustom;
