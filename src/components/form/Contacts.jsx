import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';

import { Grid, withStyles } from '@material-ui/core';

import { getLanguagesAction } from '../../actions/staticActions';

import { TextInput, PhoneInput, Select } from '../common/form/controls';
import { Button } from '../common/form/buttons';

import {
  requiredValidation,
  requiredNotEmptyValidation,
  isPhoneValidation,
} from '../../utils';

const styles = {
  container: {
    // height: 541,
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
  uploadBtn: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    fontSize: 17,
    color: '#9BB0CB',
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  minusButton: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    fontSize: 27,
    color: '#9BB0CB',
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: 45,
    left: 315,
  },
};

class Contacts extends Component {
  componentDidMount() {
    const { getLanguages } = this.props;
    getLanguages();
  }

  submit = async values => {
    const { onSubmit } = this.props;
    console.log('123', values.lang);
    const validate = requiredNotEmptyValidation(values.lang);

    if (validate == null) {
      onSubmit(values);
    } else {
      throw new SubmissionError({
        lang: validate,
        _error: 'Failed!',
      });
    }
  };

  renderPhones = ({ fields, meta: { error } }) => {
    const { classes } = this.props;

    return (
      <div>
        {fields.map((phone, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Field
              name={phone}
              type="text"
              component={PhoneInput}
              label={`Phone #${index + 1}`}
              validate={[isPhoneValidation]}
            />
            <button
              onClick={() => fields.remove(index)}
              style={{ visibility: fields.length < 2 ? 'hidden' : '' }}
              className={classes.minusButton}
              type="button"
            >
              &#8722;
            </button>
          </div>
        ))}
        <button
          style={{ visibility: fields.length > 2 ? 'hidden' : '' }}
          onClick={() => fields.push()}
          className={classes.uploadBtn}
          type="button"
        >
          &#43; add phone number
        </button>
      </div>
    );
  };

  render() {
    const { handleSubmit, languages, classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container classes={{ container: classes.container }}>
          <Grid item lg={6} md={6} xs={6} className={classes.grid}>
            <div className={classes.formInputs}>
              <Field
                name="company"
                type="text"
                component={TextInput}
                label="Company"
                validate={[requiredValidation]}
              />
              <Field
                name="github"
                type="text"
                component={TextInput}
                label="Github link"
              />
              <Field
                name="facebook"
                type="text"
                component={TextInput}
                label="Facebook link"
              />
              <Field
                name="lang"
                label="Languages"
                multiple={false}
                options={[...languages]}
                component={Select}
                validate={[requiredNotEmptyValidation]}
              />
            </div>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <div className={classes.formInputs}>
              <Field
                name="fax"
                type="text"
                component={PhoneInput}
                label="Fax"
              />
              <FieldArray name="phones" component={this.renderPhones} />
            </div>
            <div className={classes.buttonsDiv}>
              <Link to={'/user/profile'} style={{ textDecoration: 'none' }}>
                <Button name="Back" background="#C1CFE0" type="button" />
              </Link>
              <Button type="submit" name="Forward" />
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  languages: state.static.languages,
  initialValues: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getLanguages: () => dispatch(getLanguagesAction()),
});

Contacts = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  enableReinitialize: true,
  touchOnBlur: false,
})(Contacts);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Contacts));
