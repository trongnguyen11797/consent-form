import { useContext, useEffect, useState } from 'react';

import { FormContext } from 'src/providers/FormContext';
import { LOCAL_STORAGE_KEY, generatorUUID, toDataUrl } from 'src/common/constant';

import AudioCustom from 'src/components/AudioCustom';

import { DataType, PropsType, StatusRecordType } from 'src/models/home.model';

const RecordForm = (props: PropsType) => {
  const { data, setData } = useContext(FormContext);

  const [transcript, setTranscript] = useState<string>('');

  const [audioUrl, setAudioUrl] = useState<string>('');

  const [isPlay, setIsPlay] = useState(false);
  const [status, setStatus] = useState<StatusRecordType>('init');
  const [isRead, setIsRead] = useState<boolean>(true);

  const langCode = data.language?.langCode;

  useEffect(() => {
    (() => {
      let text = '';

      if (langCode === 'en-US') {
        text = `You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services. Do you agree to this agreement? Please respond by saying "Yes" or "No".`;
      } else if (langCode === 'fr-FR') {
        text = `Vous comprenez qu'en utilisant le site ou les services du site, vous acceptez d'être lié par cet accord. Si vous n'acceptez pas cet accord dans son intégralité, vous ne devez pas accéder ou utiliser le site ou les services du site. Êtes-vous d'accord avec cet accord ? Veuillez répondre en disant "Oui" ou "Non".`;
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = langCode || 'en-US';
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        console.log('??');
        setIsRead(false);
      };
    })();
  }, []);

  const onIsCheckSaid = (currentTranscript?: string) => {
    let isCheckSaid = false;
    if (langCode === 'en-US') {
      isCheckSaid = ['yes', 'no'].includes(currentTranscript || transcript) && !isPlay;
    } else if (langCode === 'fr-FR') {
      isCheckSaid = ['oui', 'non'].includes(currentTranscript || transcript) && !isPlay;
    }

    return isCheckSaid;
  };

  const onRetry = () => {
    setAudioUrl('');
    setTranscript('');
    setIsPlay(false);
    setStatus('init');
  };

  const onNextStep = () => {
    const text = transcript.toLocaleLowerCase();
    const isAgree = ['yes', 'oui'].includes(text) ? true : false;

    toDataUrl(audioUrl || '', (audioUrl) => {
      const currentData: DataType = { ...data, record: transcript, audioUrl, isAgree };
      setData(currentData);
      let dataLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.consent_form) || '[]');

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
      localStorage.setItem(LOCAL_STORAGE_KEY.consent_form, JSON.stringify(dataLocalStorage));
      props.setSteps('success-form');
    });
  };

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
        transcript={transcript}
        onIsCheckSaid={onIsCheckSaid}
        audioUrl={audioUrl || ''}
        onRetry={onRetry}
        isPlay={isPlay}
        status={status}
        isRead={isRead}
        setIsPlay={setIsPlay}
        setTranscript={setTranscript}
        setAudioUrl={setAudioUrl}
        setStatus={setStatus}
      />

      {onIsCheckSaid() && (
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
