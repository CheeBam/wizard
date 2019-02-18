import React, { Component } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Field, reduxForm, SubmissionError } from 'redux-form';

import { Grid, Button, withStyles } from '@material-ui/core';

import { requiredValidation, confirmPasswordValidation, serverUsernameValidation } from '../../utils';
import { changeAvatarAction } from "../../actions/userActions";
import { PasswordInput, TextInput, Avatar } from '../common/form/controls';

const styles = {
    gridAvatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

class Account extends Component {

    submit = async (values) => {
        const { onSubmit, match: { params: { id } } } = this.props;
        const validate = await serverUsernameValidation(values.username, id);

        if (validate == null) {

            onSubmit(values);
        } else {
            throw new SubmissionError({
                username: validate,
                _error: 'Failed!'
            })
        }
    };

    render() {
        const { handleSubmit, classes } = this.props;

        return (
            <Grid
                container
                spacing={8}
                justify="center"
            >
                <Grid item lg={6} md={6} xs={6} classes={{item: classes.gridAvatar}}>
                    <Field
                        name="avatar"
                        type="hidden"
                        component={Avatar}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={6}>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <Field
                            name="username"
                            type="text"
                            component={TextInput}
                            label="Username"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="password"
                            type="password"
                            component={PasswordInput}
                            label="Password"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="confirm"
                            type="password"
                            component={PasswordInput}
                            label="Repeat Password"
                            validate={[requiredValidation, confirmPasswordValidation]}
                        />
                        <div>
                            <Button variant="contained" color="primary" type="submit">
                                Forward
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        )
    }
};

const mapStateToProps = (state) => ({
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    changeAvatar: data => dispatch(changeAvatarAction(data)),
});

const connectedAccount = reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    enableReinitialize : true,
    touchOnBlur: false,
})(Account);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(connectedAccount)));
