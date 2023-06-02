import { useState } from 'react';

import { FormProvider } from 'src/providers/FormContext';

import RecordForm from './RecordForm';
import InputForm from './InputForm';
import SuccessForm from './SuccessForm';

import { StepsType } from 'src/models/home.model';

const Home = () => {
  const [steps, setSteps] = useState<StepsType>('input-form');

  return (
    <FormProvider>
      <div className='home'>
        <h1>Consent Form</h1>

        <div className='step'>
          {steps === 'input-form' && <InputForm setSteps={setSteps} />}
          {steps === 'record-form' && <RecordForm setSteps={setSteps} />}
          {steps === 'success-form' && <SuccessForm />}
        </div>
      </div>
    </FormProvider>
  );
};

export default Home;
