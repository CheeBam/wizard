import React from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { styles } from './styles';

const CheckList = props => {
  const {
    classes,
    input,
    options,
    label,
    meta: { touched, error },
  } = props;

  return (
    <FormControl classes={{ root: classes.formControl }}>
      <FormLabel classes={{ root: classes.label }} htmlFor={input.name}>
        {label}
      </FormLabel>

      {options.map((option, i) => (
        <div key={i}>
          <Checkbox
            color={'default'}
            classes={{
              root: classes.checkbox,
              checked: classes.checkboxChecked,
            }}
            name={`${input.name}[${i}]`}
            defaultChecked={input.value.indexOf(option.value) !== -1}
            label={option.label}
            onChange={(e, checked) => {
              let newValue = [...input.value];
              if (checked) {
                newValue.push(option.value);
              } else {
                newValue.splice(newValue.indexOf(option.value), 1);
              }
              return input.onChange(newValue);
            }}
          />
          {option.label}
        </div>
      ))}

      {touched && error && (
        <FormHelperText error={error && touched} className="errors-list">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CheckList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckList);
