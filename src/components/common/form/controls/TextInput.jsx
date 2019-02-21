import React from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  FormHelperText,
  Input,
  FormLabel,
  withStyles,
} from '@material-ui/core';

import { styles } from './styles.jsx';

const TextInput = props => {
  const {
    classes,
    input,
    label,
    type,
    meta: { touched, error },
    ...other
  } = props;

  return (
    <FormControl classes={{ root: classes.formControl }}>
      <FormLabel classes={{ root: classes.label }} htmlFor={input.name}>
        {label}
      </FormLabel>

      <Input
        disableUnderline
        fullWidth
        type={type}
        classes={{
          root: classes.root,
          input: classes.input,
          error: classes.error,
          focused: classes.focused,
          formControl: classes.inputControl,
        }}
        margin="dense"
        error={!!(touched && error)}
        {...input}
        {...other}
      />

      {touched && error && (
        <FormHelperText error={error && touched} className="errors-list">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextInput);
