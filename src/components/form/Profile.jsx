import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import { Grid, Button } from '@material-ui/core';
import {Field, reduxForm, SubmissionError} from 'redux-form';

// import { withStyles } from '@material-ui/core/styles';

import { DatePicker, RadioGroup, TextInput, GoogleAutoComplete } from '../common/form/controls';
import { requiredValidation, isAdultValidation, serverEmailValidation } from '../../utils';

class Profile extends Component {

    submit = async (values) => {
        const { onSubmit, match: { params: { id } } } = this.props;
        const validate = await serverEmailValidation(values.email, id);

        if (validate == null) {
            onSubmit(values);
        } else {
            throw new SubmissionError({
                email: validate,
                _error: 'Failed!'
            })
        }
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                >
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="firstName"
                            type="text"
                            component={TextInput}
                            label="FirstName"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={TextInput}
                            label="LastName"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="birthday"
                            type="text"
                            component={DatePicker}
                            label="Birthday"
                            validate={[isAdultValidation]}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="email"
                            type="email"
                            component={TextInput}
                            label="Email"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="address"
                            component={GoogleAutoComplete}
                            label="Address"
                        />
                        <Field
                            component={RadioGroup}
                            name="sex"
                            options={[
                                { title: 'Male', value: 'male' },
                                { title: 'Female', value: 'female' }
                            ]}
                            validate={[requiredValidation]}
                        />
                        <div>
                            <Link to={'/user/account'}>
                                <Button variant="contained" color="default" type="submit">
                                    Back
                                </Button>
                            </Link>
                            <Button variant="contained" color="primary" type="submit">
                                Forward
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        )
    }
};

const mapStateToProps = (state) => ({
    initialValues: state.user.user,
});

// const mapDispatchToProps = (dispatch)  => ({
//
// });

Profile = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    enableReinitialize : true,
    touchOnBlur: false,
})(Profile);

export default withRouter(connect(
    mapStateToProps,
    null,
)(Profile));

