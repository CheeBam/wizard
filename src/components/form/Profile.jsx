import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import {Grid, withStyles} from '@material-ui/core';
import {Field, reduxForm, SubmissionError} from 'redux-form';

import { requiredValidation, isAdultValidation, serverEmailValidation } from '../../utils';

import { DatePicker, RadioGroup, TextInput, GoogleAutoComplete } from '../common/form/controls';
import { Button } from '../common/form/buttons';


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
    }
};

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
        const { handleSubmit, classes } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Grid
                    container
                    justify="center"
                    classes={{ container: classes.container }}
                >
                    <Grid item lg={6} md={6} xs={6} className={classes.grid}>
                        <div className={classes.formInputs}>
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
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} xs={6} className={classes.grid}>
                        <div className={classes.formInputs}>
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
                                label="Gender"
                                options={[
                                    { title: 'Male', value: 'male' },
                                    { title: 'Female', value: 'female' }
                                ]}
                                validate={[requiredValidation]}
                            />
                        </div>
                        <div className={classes.buttonsDiv}>
                            <Link to={'/user/account'} style={{ textDecoration: 'none' }}>
                                <Button name="Back" background="#C1CFE0" type="button"/>
                            </Link>
                            <Button name="Forward" type="submit" />
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
)(withStyles(styles)(Profile)));

