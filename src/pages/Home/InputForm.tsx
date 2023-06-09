import { useContext, useState } from 'react';

import { FormContext } from 'src/providers/FormContext';

import { CurrentSelectType, PropsType, langCodeType } from 'src/models/home.model';

const InputForm = (props: PropsType) => {
  const { data, setData } = useContext(FormContext);

  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [currentSelect, setCurrentSelect] = useState<CurrentSelectType>(data.language?.label || 'Select language');
  const [isRequired, setIsRequired] = useState<boolean>(false);

  const onSelect = (langCode: langCodeType, label: CurrentSelectType) => {
    setIsRequired(false);

    setCurrentSelect(label);
    setData((prev) => ({
      ...prev,
      language: {
        langCode,
        label,
      },
    }));
    setIsSelect(false);
  };

  const onNextStep = () => {
    if (!data.name || !data.language?.langCode) {
      setIsRequired(true);
      return;
    }
    props.setSteps('record-form');
  };

  const selectBoxClass = `select__box flex-center flex-between ${isSelect ? 'show' : ''}`;
  const isRequiredName = isRequired && !data.name && <span className='error__msg'>Please enter your name</span>;
  const isRequiredLanguage = isRequired && !data.language?.langCode && <span className='error__msg'>Please select language</span>;

  return (
    <div className='input__form'>
      <div className='form__item'>
        <p>Name</p>
        <input
          defaultValue={data.name || ''}
          type='text'
          name='name'
          placeholder='Enter your name'
          onChange={(e) => {
            setIsRequired(false);
            setData((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        {isRequiredName}
      </div>

      <div className='form__item'>
        <p>Language</p>
        <div className={selectBoxClass} onClick={() => setIsSelect(!isSelect)}>
          <div className='overlay' onClick={() => setIsSelect(false)}></div>
          {currentSelect}
          <i className='fa-solid fa-chevron-down'></i>
          <div className='sub__menu'>
            <div className='item' onClick={() => onSelect('en-US', 'English')}>
              English
            </div>
            <div className='item' onClick={() => onSelect('fr-FR', 'French')}>
              French
            </div>
          </div>
        </div>
        {isRequiredLanguage}
      </div>

      <button className='btn__step flex-center flex-between flex-gap-1' onClick={onNextStep}>
        Next
        <i className='fa-solid fa-arrow-right-long'></i>
      </button>
    </div>
  );
};
export default InputForm;
