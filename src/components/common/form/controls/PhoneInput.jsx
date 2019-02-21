import React from 'react';
import InputMask from 'react-input-mask';

import { TextInput } from '../controls';

const PhoneField = props => {
  const { input } = props;

  return (
    <InputMask mask="+7(999) 999-99-99" {...input}>
      {() => <TextInput {...props} />}
    </InputMask>
  );
};

export default PhoneField;
