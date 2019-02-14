import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { Grid, TextField, Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import InputMask from 'react-input-mask';

// import { withStyles } from '@material-ui/core/styles';

import { getLanguagesAction } from "../../actions/staticActions";
import { isEditPage, countPhones } from '../../helpers';

import {
    requiredValidation,
    isPhoneValidation,
} from '../../utils';


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
            helperText={touched && error}
            { ...input }
            { ...other }
        />
    )
};

const PhoneField = props => {

    const { input, label, type, meta: { touched, error }, ...other } = props;

    return (
        <InputMask
            mask="+7(999) 999-99-99"
            { ...input }
            { ...other }
        >
            {
                () => <TextField
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    type={type}
                    label={label}
                    error={!!(touched && error)}
                    helperText={touched && error}
                    { ...input }
                    { ...other }
                />
            }
        </InputMask>
    )
};

class Contacts extends Component {

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        const { getLanguages, user, isEdit } = this.props;
        getLanguages();

        if(isEdit) {
            this.setState({
                phonesAmount: countPhones(user),
            });
        }
    };

    state = {
        phonesAmount: 2,
    };

    changePhoneAmount(add) {
        return () => {
            const { phonesAmount } = this.state;
            this.setState({
                phonesAmount: add ? phonesAmount + 1 : phonesAmount - 1,
            });
        }
    }

    renderPhones() {
        const { phonesAmount } = this.state;
        const phones = [];

        for (let i = 1; i <= phonesAmount; i++) {
            phones.push(
                <Field
                    key={i}
                    name={`phone${i}`}
                    type="text"
                    component={PhoneField}
                    label={`Phone ${i}`}
                    validate={[isPhoneValidation]}
                />
            );
        }

        return phones;
    }

    render() {
        const { handleSubmit, languages } = this.props;
        const { phonesAmount } = this.state;
        const langs = [ ...languages ];

        return (
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                >
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="company"
                            type="text"
                            component={CustomTextField}
                            label="Company"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="github"
                            type="text"
                            component={CustomTextField}
                            label="Github link"
                        />
                        <Field
                            name="facebook"
                            type="text"
                            component={CustomTextField}
                            label="Facebook link"
                        />
                        <Field name="lang"
                            component={({input, value, onChange, meta: { touched, error }, onBlur, options, other}) =>
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    onBlur={() => onBlur(value)}
                                    options={langs}
                                    placeholder="Select"
                                    simpleValue
                                    { ...input }
                                    { ...other }
                                />
                            }
                            validate={[requiredValidation]}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="fax"
                            type="text"
                            component={PhoneField}
                            label="Fax"
                        />
                        { this.renderPhones() }
                        <div>
                            <Button style={{ visibility: phonesAmount > 2 ? 'hidden' : '' }} onClick={this.changePhoneAmount(true)} variant="contained" color="secondary" type="button">
                                +
                            </Button>
                            <Button style={{ visibility: phonesAmount < 2 ? 'hidden' : '' }} onClick={this.changePhoneAmount(false)} variant="contained" color="secondary" type="button">
                                -
                            </Button>

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
    languages: state.static.languages,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    getLanguages: () => dispatch(getLanguagesAction()),
});

Contacts = reduxForm({
    form: 'contacts',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(Contacts);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);
