import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import { Grid, Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

// import { withStyles } from '@material-ui/core/styles';

import DatePicker from '../common/form/controls/DatePicker';
import RadioButton from '../common/form/controls/RadioButton';
import TextInput from '../common/form/controls/TextInput';
import GoogleAutoComplete from '../common/form/controls/GoogleAutoComplete';

import { requiredValidation } from '../../utils';

class Account extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
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
                        <label>Gender</label>
                        <div>
                            <label>
                                <Field
                                    name="sex"
                                    component={RadioButton}
                                    type="radio"
                                    value="male"
                                    validate={[requiredValidation]}
                                />{' '}
                                Male
                            </label>
                            <label>
                                <Field
                                    name="sex"
                                    component={RadioButton}
                                    type="radio"
                                    value="female"
                                    validate={[requiredValidation]}
                                />{' '}
                                Female
                            </label>
                        </div>
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
    user: state.user.user,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({

});

Account = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(Account);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);

