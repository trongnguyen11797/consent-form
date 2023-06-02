export type CurrentSelectType = 'Select language' | 'English' | 'French';
export type langCodeType = 'en-US' | 'fr-FR';
export type StepsType = 'input-form' | 'record-form' | 'success-form';
export type StatusRecordType = 'init' | 'pending' | 'success';

export type PropsType = {
  setSteps: React.Dispatch<React.SetStateAction<StepsType>>;
};

export type DataType = {
  language?: {
    langCode: langCodeType;
    label: CurrentSelectType;
  };
  name: string;
  audioUrl: string;
  record: string;
  isAgree: boolean;
  id: string;
};

export type AudioCustomPropsType = {
  transcript: string;
  audioUrl: string;
  onIsCheckSaid: (currentTranscript?: string) => boolean;
  isPlay: boolean;
  status: StatusRecordType;
  onRetry: () => void;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusRecordType>>;
};
