import React, { Component } from 'react';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import { getHobbiesAction, getSkillsAction } from '../../actions/staticActions';

import { Grid, Button, FormGroup, FormLabel, Checkbox } from '@material-ui/core';

import { Select, MultiTextInput } from '../common/form/controls';

import { minCountValidation, maxLengthValidation } from '../../utils';

const renderCheckboxGroup = ({ name, options, input }) => {
    return options.map((option, i) => (
        <div key={i}>
            <Checkbox
                name={`${name}[${i}]`}
                defaultChecked={input.value.indexOf(option.value) !== -1}
                label={option.label}
                onChange={(e, checked) => {
                    let newValue = [...input.value];
                    if (checked){
                        newValue.push(option.value);
                    } else {
                        newValue.splice(newValue.indexOf(option.value), 1);
                    }
                    return input.onChange(newValue);
                }}
            />
            { option.label }
        </div>
    ));
};

const maxLength300 = maxLengthValidation(300);

class Capabilities extends Component {
    componentDidMount() {
        const { getSkills, getHobbies } = this.props;

        getSkills();
        getHobbies();
    }

    submit = async (values) => {
        const { onSubmit } = this.props;
        const validate = minCountValidation(values.skills);

        if (validate == null) {
            onSubmit(values);
        } else {
            throw new SubmissionError({
                skills: validate,
                _error: 'Failed!'
            })
        }
    };

    render() {
        const { handleSubmit, skills, hobbies } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                >
                    <Grid item lg={6} md={6} xs={6}>
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
                            label="Additional information-"
                            validate={[maxLength300]}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <FormLabel component="legend">Hobbies</FormLabel>
                        <FormGroup>
                            <Field
                                name="hobbies"
                                component={renderCheckboxGroup}
                                options={hobbies}
                            />
                        </FormGroup>
                        <div>
                            <Button variant="contained" color="secondary" type="submit">
                                Finish
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        )
    }
};

const mapStateToProps = (state) => ({
    skills: state.static.skills,
    hobbies: state.static.hobbies,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    getSkills: () => dispatch(getSkillsAction()),
    getHobbies: () => dispatch(getHobbiesAction()),
});

Capabilities = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    enableReinitialize : true,
    touchOnBlur: false,
})(Capabilities);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Capabilities);

