import { createContext, useState } from 'react';
import { FormContextType } from 'src/models/form-context.models';
import { DataType } from 'src/models/home.model';

export const FormContext = createContext({} as FormContextType);

export const FormProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<DataType>({} as DataType);

  return <FormContext.Provider value={{ data, setData }}>{children}</FormContext.Provider>;
};
