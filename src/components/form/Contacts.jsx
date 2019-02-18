import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { getLanguagesAction } from "../../actions/staticActions";

import { Grid, Button } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

import { requiredValidation, isPhoneValidation } from '../../utils';

import { TextInput, PhoneInput, Select } from '../common/form/controls';

class Contacts extends Component {
    componentDidMount() {
        const { getLanguages } = this.props;
        getLanguages();
    };

    renderPhones = ({ fields, meta: { error } }) => (
        <div>
            <Button style={{visibility: fields.length > 2 ? 'hidden' : ''}} onClick={() => fields.push()}
                    variant="contained" color="secondary" type="button">
                +
            </Button>
            {fields.map((phone, index) => (
                <div key={index}>
                    <Button style={{visibility: fields.length < 2 ? 'hidden' : ''}} onClick={() => fields.remove(index)}
                            variant="contained" color="secondary" type="button">
                        -
                    </Button>
                    <Field
                        name={phone}
                        type="text"
                        component={PhoneInput}
                        label={`Phone #${index + 1}`}
                        validate={[isPhoneValidation]}
                    />
                </div>
            ))}
            {error && <p className="error">{error}</p>}
        </div>
    );

    render() {
        const { handleSubmit, languages } = this.props;

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
                            validate={[requiredValidation]}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <Field
                            name="fax"
                            type="text"
                            component={TextInput}
                            label="Fax"
                        />
                        <FieldArray name="phones" component={this.renderPhones} />

                        <Button variant="contained" color="primary" type="submit">
                            Forward
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
};

const mapStateToProps = (state) => ({
    languages: state.static.languages,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    getLanguages: () => dispatch(getLanguagesAction()),
});

Contacts = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    enableReinitialize : true,
    touchOnBlur: false,
})(Contacts);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);
