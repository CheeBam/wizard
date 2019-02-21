import React, { Component } from 'react';
import {
  Radio,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormControl,
  withStyles,
} from '@material-ui/core';

import { styles } from './styles.jsx';

class RadioGroup extends Component {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      options,
      classes,
    } = this.props;

    return (
      <FormControl classes={{ root: classes.formControl }}>
        <FormLabel classes={{ root: classes.label }} htmlFor={input.name}>
          {label}
        </FormLabel>
        <div>
          {options.map(o => (
            <FormControlLabel
              key={o.value}
              control={
                <Radio
                  color="primary"
                  margin="normal"
                  label={o.title}
                  type="radio"
                  {...input}
                  checked={o.value === input.value}
                  value={o.value}
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label={o.title}
            />
          ))}
        </div>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}

export default withStyles(styles)(RadioGroup);
