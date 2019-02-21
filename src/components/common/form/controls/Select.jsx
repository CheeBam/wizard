import React from 'react';
import Select from 'react-select';

import {
  FormHelperText,
  FormControl,
  FormLabel,
  withStyles,
} from '@material-ui/core';

import { styles } from './styles';

const customStyles = {
  input: base => ({
    ...base,
    color: '#000',
    backgroundColor: '#FFF',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'normal',
    fontSize: 17,
    width: 10,
  }),
  control: (base, state) => {
    return {
      ...base,
      boxShadow: 'none',
      borderRadius: 0,
      border: state.selectProps.error ? '1px solid red' : '1px solid #C1CFE0',
      height: state.isMulti ? 'inherit' : 40,
      '&:hover': {
        borderColor: '#A1C4FF',
      },
      '&:focused': {
        borderColor: '#A1C4FF',
      },
    };
  },
};

const SelectInput = props => {
  const {
    input,
    options,
    multiple,
    meta: { touched, error },
    label,
    classes,
  } = props;

  return (
    <FormControl classes={{ root: classes.formControl }}>
      <FormLabel classes={{ root: classes.selectLabel }} htmlFor={input.name}>
        {label}
      </FormLabel>

      <Select
        options={options}
        isMulti={multiple}
        placeholder="Select"
        simpleValue
        error={touched && !!error}
        onChange={input.onChange}
        value={input.value}
        styles={customStyles}
      />

      {touched && error && (
        <FormHelperText error={!!error && touched} className="errors-list">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default withStyles(styles)(SelectInput);
