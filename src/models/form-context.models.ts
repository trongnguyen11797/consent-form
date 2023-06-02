import React from 'react';
import { DataType } from './home.model';

export type FormContextType = {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
};
