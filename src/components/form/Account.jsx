import React, { Component } from 'react';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Field, reduxForm, SubmissionError } from 'redux-form';

import { Grid, withStyles } from '@material-ui/core';

import {
  requiredValidation,
  confirmPasswordValidation,
  serverUsernameValidation,
} from '../../utils';
import { changeAvatarAction } from '../../actions/userActions';

import { PasswordInput, TextInput, Avatar } from '../common/form/controls';
import { Button } from '../common/form/buttons';

const styles = {
  gridAvatar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  container: {
    height: 541,
    paddingTop: 43,
    background: '#FAFCFF',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
  },
  formInputs: {
    display: 'flex',
    flexDirection: 'column',
  },
  formButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 130,
  },
};

class Account extends Component {
  submit = async values => {
    const {
      onSubmit,
      match: {
        params: { id },
      },
    } = this.props;
    const validate = await serverUsernameValidation(values.username, id);

    if (validate == null) {
      onSubmit(values);
    } else {
      throw new SubmissionError({
        username: validate,
        _error: 'Failed!',
      });
    }
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        classes={{ container: classes.container }}
      >
        <Grid item lg={6} md={6} xs={6} classes={{ item: classes.gridAvatar }}>
          <Field name="avatar" type="text" component={Avatar} />
        </Grid>
        <Grid item lg={6} md={6} xs={6}>
          <form onSubmit={handleSubmit(this.submit)} className={classes.form}>
            <div className={classes.formInputs}>
              <Field
                classes={{ root: classes.form }}
                name="username"
                component={TextInput}
                label="User name"
                validate={[requiredValidation]}
              />
              <Field
                name="password"
                type="password"
                component={PasswordInput}
                label="Password"
                validate={[requiredValidation]}
              />
              <Field
                name="confirm"
                type="password"
                component={PasswordInput}
                label="Repeat Password"
                validate={[requiredValidation, confirmPasswordValidation]}
              />
            </div>
            <div className={classes.formButton}>
              <Button name="Forward" type="submit" />
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  changeAvatar: data => dispatch(changeAvatarAction(data)),
});

const connectedAccount = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  enableReinitialize: true,
  touchOnBlur: false,
})(Account);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(connectedAccount))
);
