import { useContext, useRef } from 'react';

import { FormContext } from 'src/providers/FormContext';
import { capitalizeFirstLetter } from 'src/common/constant';

import PlayAudio from '../AudioPlay';

import { AudioCustomPropsType } from 'src/models/home.model';

const AudioCustom = (props: AudioCustomPropsType) => {
  const { data } = useContext(FormContext);
  // Init speechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = data.language?.langCode || 'en-US';

  const mediaRecorderRef = useRef<any>(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;
        // Start inside check async
        mediaRecorder.start();
        recognition.start();
        props.setIsPlay(true);
        props.setStatus('success');

        const audioChunks: any = [];

        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);

          props.setAudioUrl(audioUrl);
        });
      })
      .catch(console.error);
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const speechToText = event.results[0][0].transcript;
    if (props.onIsCheckSaid(speechToText)) {
      onStopRecord();
    }
    props.setTranscript(speechToText);
  };

  const onStopRecord = () => {
    recognition.stop();
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    props.setIsPlay(false);
  };

  const onRecord = () => {
    if (props.isPlay) {
      onStopRecord();
    } else {
      props.onRetry();
      startRecording();
      props.setStatus('pending');
    }
  };

  const wrapperClass = `record__box ${props.isPlay ? 'recording' : ''}`;

  const isSpeechSuccess = props.transcript && !props.isPlay;
  const isSpeechPending = props.transcript && props.isPlay;

  const isEnglish = data.language?.langCode === 'en-US';
  const isFrench = data.language?.langCode === 'fr-FR';

  const renderRespondedSuccess =
    isSpeechSuccess && isEnglish ? (
      <p>You responded "{capitalizeFirstLetter(props.transcript)}"</p>
    ) : isSpeechSuccess && isFrench ? (
      <p>Vous avez répondu "{capitalizeFirstLetter(props.transcript)}"</p>
    ) : (
      ''
    );

  const renderSpeech =
    isSpeechPending && isEnglish ? (
      <p>You said: "{capitalizeFirstLetter(props.transcript)}"</p>
    ) : isSpeechPending && isFrench ? (
      <p>Vous avez dit: "{capitalizeFirstLetter(props.transcript)}"</p>
    ) : (
      ''
    );

  const isRespondedFailed = isSpeechSuccess && isEnglish ? <p>Please try again</p> : isSpeechSuccess && isFrench ? <p>Veuillez réessayer</p> : '';
  const isCheckTryAgain =
    props.status === 'pending' && isEnglish ? <p>Please await...</p> : props.status === 'pending' && isFrench ? <p>Veuillez patienter...</p> : '';

  return (
    <div className={wrapperClass}>
      {props.onIsCheckSaid() ? (
        <>
          <PlayAudio audioUrl={props.audioUrl} isPlay={props.isPlay} />
          {renderRespondedSuccess}
        </>
      ) : (
        <div className='flex-center flex-column flex-gap-1'>
          {renderSpeech}

          <button className='btn__record btn__common' onClick={onRecord}>
            <i className='fa-solid fa-microphone'></i>
          </button>

          {isCheckTryAgain}

          {isRespondedFailed}
        </div>
      )}
    </div>
  );
};

export default AudioCustom;
