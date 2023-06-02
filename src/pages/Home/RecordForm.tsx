import { useContext, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useReactMediaRecorder } from 'react-media-recorder';

import { FormContext } from 'src/providers/FormContext';
import { generatorUUID } from 'src/common/constant';

import AudioCustom from 'src/components/AudioCustom';
import { DataType, PropsType } from 'src/models/home.model';

const RecordForm = (props: PropsType) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({ video: false });

  const { data, setData } = useContext(FormContext);

  const [isPlay, setIsPlay] = useState(false);

  let isCheckSaid = (transcript.toLocaleLowerCase() === 'yes' || transcript.toLocaleLowerCase() === 'no') && status === 'stopped';
  if (data.language?.langCode === 'en-US') {
    isCheckSaid = (transcript.toLocaleLowerCase() === 'yes' || transcript.toLocaleLowerCase() === 'no') && status === 'stopped';
  } else if (data.language?.langCode === 'fr-FR') {
    isCheckSaid = (transcript.toLocaleLowerCase() === 'oui' || transcript.toLocaleLowerCase() === 'non') && status === 'stopped';
  }

  const onRetry = () => {
    resetTranscript();
    clearBlobUrl();
    setIsPlay(false);
  };

  const onNextStep = () => {
    const text = transcript.toLocaleLowerCase();
    const isAgree = text === 'yes' || text === 'oui' ? true : false;
    const currentData: DataType = { ...data, record: transcript, audioSrc: mediaBlobUrl || '', isAgree };
    setData(currentData);
    let dataLocalStorage = JSON.parse(localStorage.getItem('consent-form') || '[]');

    if (Object.keys(dataLocalStorage).length > 0) {
      dataLocalStorage = [
        ...dataLocalStorage,
        {
          ...currentData,
          id: generatorUUID(),
        },
      ];
    } else {
      dataLocalStorage = [
        {
          ...currentData,
          id: generatorUUID(),
        },
      ];
    }
    localStorage.setItem('consent-form', JSON.stringify(dataLocalStorage));
    props.setSteps('success-form');
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='record__form'>
      {data.language?.langCode === 'en-US' && (
        <>
          <p>
            You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in
            its entirety, you must not access or use the site or the site services.
          </p>

          <p>Do you agree to this agreement? Please respond by saying "Yes" or "No".</p>
        </>
      )}

      {data.language?.langCode === 'fr-FR' && (
        <>
          <p>
            Vous comprenez qu'en utilisant le site ou les services du site, vous acceptez d'être lié par cet accord. Si vous n'acceptez pas cet accord
            dans son intégralité, vous ne devez pas accéder ou utiliser le site ou les services du site.
          </p>

          <p>Acceptez-vous cet accord ? Veuillez répondre en disant "Oui" ou "Non".</p>
        </>
      )}

      <AudioCustom
        status={status}
        transcript={transcript}
        startRecording={startRecording}
        stopRecording={stopRecording}
        SpeechRecognition={SpeechRecognition}
        isCheckSaid={isCheckSaid}
        onRetry={onRetry}
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        mediaBlobUrl={mediaBlobUrl || ''}
      />

      {isCheckSaid && (
        <div className='btn__box'>
          <button className='btn__step' onClick={onRetry}>
            Retry
            <i className='fa-solid fa-rotate-right'></i>
          </button>
          <button className='btn__step' onClick={onNextStep}>
            Save
            <i className='fa-solid fa-arrow-right-long'></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordForm;
