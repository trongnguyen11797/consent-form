import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useReactMediaRecorder } from 'react-media-recorder';
import { capitalizeFirstLetter } from 'src/common/constant';

const RecordForm = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const onSpeak = () => {
    SpeechRecognition.startListening();
    startRecording();

    setTimeout(() => {
      SpeechRecognition.stopListening();
      stopRecording();
    }, 4000);
  };

  const onPlay = () => {
    setIsPlay((prev) => (prev ? false : true));
    console.log();
    if (isPlay) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setTimeout(() => {
      setIsPlay(false);
    }, (audioRef.current?.duration || 0) * 1000);
  };

  const onRetry = () => {
    setIsPlay(false);
    resetTranscript();
  };

  return (
    <div className='record__form form__box'>
      <p>
        You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its
        entirety, you must not access or use the site or the site services.
      </p>
      <p>Say {transcript}</p>

      <p>Do you agree to this agreement? Please respond by saying "Yes" or "No".</p>
      <div className={`btn__box btn__box--record ${status === 'recording' || status === 'acquiring_media' ? 'recording' : ''}`}>
        {status === 'stopped' && transcript ? (
          <>
            <button onClick={onPlay}>{isPlay ? <i className='fa-solid fa-pause'></i> : <i className='fa-solid fa-play'></i>}</button>
            <audio ref={audioRef} src={mediaBlobUrl || ''}></audio>
            {transcript && <p>You responded "{capitalizeFirstLetter(transcript)}"</p>}
          </>
        ) : (
          <button onClick={onSpeak}>
            <i className='fa-solid fa-microphone'></i>
          </button>
        )}
      </div>

      <button onClick={onRetry}>Retry</button>
      <button>save</button>
    </div>
  );
};

export default RecordForm;
