import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { Grid, TextField, Button } from '@material-ui/core';
import { Field, FieldArray, reduxForm } from 'redux-form';


// import { withStyles } from '@material-ui/core/styles';

import { getLanguagesAction } from "../../actions/staticActions";
import { countPhones } from '../../helpers';

import {
    requiredValidation,
    isPhoneValidation,
} from '../../utils';

import TextInput from '../common/form/controls/TextInput';
import PhoneInput from '../common/form/controls/PhoneInput';
import SelectInput from '../common/form/controls/Select';

class Contacts extends Component {

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
    };

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
            {fields.map((hobby, index) => (
                <div key={index}>
                    <Button style={{visibility: fields.length < 2 ? 'hidden' : ''}} onClick={() => fields.remove(index)}
                            variant="contained" color="secondary" type="button">
                        -
                    </Button>
                    <Field
                        name={hobby}
                        type="text"
                        component={PhoneInput}
                        label={`Hobby #${index + 1}`}
                        // validate={[isPhoneValidation]}
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
                            label="Skills"
                            multiple={false}
                            options={[...languages]}
                            component={SelectInput}
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
    user: state.user.user,
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
})(Contacts);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);
