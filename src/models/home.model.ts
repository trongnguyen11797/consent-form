import SpeechRecognition from 'react-speech-recognition';

export type CurrentSelectType = 'Select language' | 'English' | 'French';
export type langCodeType = 'en-US' | 'fr-FR';
export type StepsType = 'input-form' | 'record-form' | 'success-form';

export type PropsType = {
  setSteps: React.Dispatch<React.SetStateAction<StepsType>>;
};

export type DataType = {
  language?: {
    langCode: langCodeType;
    label: CurrentSelectType;
  };
  name: string;
  audioSrc: string;
  record: string;
  isAgree: boolean;
};

export type AudioCustomPropsType = {
  status: string;
  transcript: string;
  mediaBlobUrl: string;
  SpeechRecognition: SpeechRecognition;
  isCheckSaid: boolean;
  isPlay: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  onRetry: () => void;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};
