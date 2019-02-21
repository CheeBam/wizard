import React, { Component } from 'react';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { getHobbiesAction, getSkillsAction } from '../../actions/staticActions';

import { Grid, withStyles } from '@material-ui/core';

import { Select, MultiTextInput, CheckList } from '../common/form/controls';
import { Button } from '../common/form/buttons';

import { minCountValidation, maxLengthValidation } from '../../utils';

const maxLength300 = maxLengthValidation(300);

const styles = {
  container: {
    paddingTop: 43,
    background: '#FAFCFF',
  },
  formInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonsDiv: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-between',
    width: 300,
  },
};

class Capabilities extends Component {
  componentDidMount() {
    const { getSkills, getHobbies } = this.props;

    getSkills();
    getHobbies();
  }

  submit = async values => {
    const { onSubmit } = this.props;
    const validate = minCountValidation(values.skills);

    if (validate == null) {
      onSubmit(values);
    } else {
      throw new SubmissionError({
        skills: validate,
        _error: 'Failed!',
      });
    }
  };

  render() {
    const { handleSubmit, skills, hobbies, classes } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Grid container className={classes.container}>
          <Grid item lg={6} md={6} xs={6} className={classes.grid}>
            <div className={classes.formInputs}>
              <Field
                name="skills"
                label="Skills"
                component={Select}
                options={[...skills]}
                multiple
              />
              <Field
                rows={4}
                name="additional"
                type="text"
                component={MultiTextInput}
                label="Additional information"
                validate={[maxLength300]}
              />
            </div>
          </Grid>
          <Grid item lg={6} md={6} xs={6} className={classes.grid}>
            <div className={classes.formInputs}>
              <Field
                name="hobbies"
                component={CheckList}
                label="Hobbies"
                options={hobbies}
              />
            </div>
            <div className={classes.buttonsDiv}>
              <Link to={'/user/profile'} style={{ textDecoration: 'none' }}>
                <Button name="Back" background="#C1CFE0" type="button" />
              </Link>
              <Button type="submit" background="#4EE4A5" name="Forward" />
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.static.skills,
  hobbies: state.static.hobbies,
  initialValues: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getSkills: () => dispatch(getSkillsAction()),
  getHobbies: () => dispatch(getHobbiesAction()),
});

Capabilities = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  enableReinitialize: true,
  touchOnBlur: false,
})(Capabilities);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Capabilities));
