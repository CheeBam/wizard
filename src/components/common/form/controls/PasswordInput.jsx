import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconButton, InputAdornment, withStyles } from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';

import { styles } from './styles.jsx';
import { TextInput } from './index';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const { passwordIsMasked } = this.state;
    const { classes } = this.props;

    return (
      <TextInput
        {...this.props}
        type={passwordIsMasked ? 'password' : 'text'}
        endAdornment={
          <InputAdornment
            position="end"
            classes={{ root: classes.endAdornment }}
          >
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.togglePasswordMask}
            >
              {passwordIsMasked ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordInput);
