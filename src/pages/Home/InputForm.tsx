import { useState } from 'react';
import { CurrentSelectType } from 'src/models/home.model';

const InputForm = () => {
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [currentSelect, setCurrentSelect] = useState<CurrentSelectType>('Select language');

  const onSelect = (name: CurrentSelectType) => {
    setCurrentSelect(name);
    setIsSelect(false);
  };

  return (
    <div className='input__form form__box'>
      <div className='form__item'>
        <p>Name</p>
        <input type='text' name='name' placeholder='Enter your name' />
      </div>

      <div className='form__item'>
        <p>Language</p>
        <div className={`select__box ${isSelect ? 'show' : ''}`} onClick={() => setIsSelect(!isSelect)}>
          {currentSelect}
          <i className='fa-solid fa-chevron-down'></i>
          <div className='sub__menu'>
            <div className='item' onClick={() => onSelect('English')}>
              English
            </div>
            <div className='item' onClick={() => onSelect('French')}>
              French
            </div>
          </div>
        </div>
      </div>

      <div className='btn__box'>
        <button>
          Next
          <i className='fa-solid fa-arrow-right-long'></i>
        </button>
      </div>
    </div>
  );
};
export default InputForm;
