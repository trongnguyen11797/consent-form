import AudioPlay from '../AudioPlay';
import { PropsConsentItem } from 'src/models/play-audio-item.model';

const ConsentItem = (props: PropsConsentItem) => {
  return (
    <div className='consent__item d-flex flex-between'>
      <div className='left'>
        <h3>{props.data.name}</h3>
        <span>Language: {props.data.language?.label}</span>
      </div>
      <div className='right flex-center flex-gap-3'>
        {props.data.isAgree ? <i className='fa-solid fa-check'></i> : <i className='fa-solid fa-xmark'></i>}

        <AudioPlay audioUrl={props.data.audioUrl} />
      </div>
    </div>
  );
};

export default ConsentItem;
