import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes, {instanceOf} from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { DateTime } from 'luxon';

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from 'react-datepicker';
import { Grid, TextField, Button, Radio } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

// import { withStyles } from '@material-ui/core/styles';

import GoogleAutoComplete from './../common/GoogleAutoComplete';

import { requiredValidation } from '../../utils';

const CustomTextField = props => {
    const { input, label, type, meta: { touched, error }, ...other } = props;

    return (
        <TextField
            variant="outlined"
            fullWidth={true}
            margin="normal"
            label={label}
            type={type}
            error={!!(touched && error)}
            { ...input }
            { ...other }
        />
    )
};

const ReactDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => {
    return (
    <div>
        <DatePicker {...input} onChange={(value) => {
            input.onChange(DateTime.fromJSDate(value).toFormat('dd-MM-yy'));
        }} dateForm="dd-MM-yy" />
        {touched && error && <span>{error}</span>}
    </div>
    );
};


const CustomRadio = props => {
    const { input, label, type, ...other } = props;

    return (
        <Radio
            color="primary"
            margin="normal"
            label={label}
            type={type}
            { ...input }
            { ...other }
        />
    )
};

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
                            component={CustomTextField}
                            label="FirstName"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={CustomTextField}
                            label="LastName"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="birthday"
                            type="text"
                            component={ReactDatePicker}
                            label="Birthday"
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="email"
                            type="email"
                            component={CustomTextField}
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
                                    component={CustomRadio}
                                    type="radio"
                                    value="male"
                                />{' '}
                                Male
                            </label>
                            <label>
                                <Field
                                    name="sex"
                                    component={CustomRadio}
                                    type="radio"
                                    value="female"
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
    form: 'profile',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(Account);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);

