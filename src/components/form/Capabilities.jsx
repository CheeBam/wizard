import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

import {Grid, TextField, Button, FormGroup, FormLabel, Checkbox } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

import { getHobbiesAction, getSkillsAction } from '../../actions/staticActions';


const CustomTextField = props => {
    const { input, label, type, meta: { touched, error }, ...other } = props;

    return (
        <TextField
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline
            rowsMax="4"
            label={label}
            type={type}
            error={!!(touched && error)}
            { ...input }
            { ...other }
        />
    )
};

const renderCheckboxGroup = ({ name, options, input, meta, ...custom}) => {

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

class Contacts extends Component {

    componentDidMount() {
        const { getSkills, getHobbies } = this.props;

        getSkills();
        getHobbies();
    }

    render() {
        const { handleSubmit, skills } = this.props;
        const sl = [...skills];

        return (
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                >
                    <Grid item lg={6} md={6} xs={6}>
                        <Field name="skills"
                               component={props =>
                                   <Select
                                       value={props.input.value}
                                       onChange={props.input.onChange}
                                       onBlur={() => props.input.onBlur(props.input.value)}
                                       options={sl}
                                       isMulti
                                       placeholder="Select"
                                       simpleValue
                                   />
                               }
                        />
                        <Field
                            rows={4}
                            name="additional"
                            type="text"
                            component={CustomTextField}
                            label="Additional information-"
                        />

                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <FormLabel component="legend">Hobbies</FormLabel>
                        <FormGroup>
                            <Field
                                name="hobbies"
                                component={renderCheckboxGroup}
                                options={this.props.hobbies}
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
    user: state.user.user,
    skills: state.static.skills,
    hobbies: state.static.hobbies,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    getSkills: () => dispatch(getSkillsAction()),
    getHobbies: () => dispatch(getHobbiesAction()),
});

Contacts = reduxForm({
    form: 'capabilities',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(Contacts);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);

