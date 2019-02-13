import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, TextField, Button, Avatar } from '@material-ui/core';
import {change, Field, reduxForm} from 'redux-form';

import { withStyles } from '@material-ui/core/styles';

import {
    requiredValidation,
    confirmPasswordValidation,
} from '../../utils';
import { changeAvatarAction } from "../../actions/userActions";

const styles = {
    avatar: {
        width: 150,
        height: 150,
    },
    gridAvatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            { touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

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

function submit(values) {
    console.log('cva', values);
}

class Account extends Component {

    encodeImageFileAsURL = e => {
        const { changeAvatar, dispatch } = this.props;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            changeAvatar(reader.result);
        };

        reader.readAsDataURL(file);
    };

    render() {
        const { handleSubmit, classes, user } = this.props;

        return (
            <Grid
                container
                spacing={8}
                justify="center"
            >
                <Grid item lg={6} md={6} xs={6} classes={{item: classes.gridAvatar}}>
                    <Avatar alt="Remy Sharp" src={user.avatar} classes={{ root: classes.avatar }} />
                    <input type="file" onChange={this.encodeImageFileAsURL} id="fileUpload" name="files"/>
                </Grid>
                <Grid item lg={6} md={6} xs={6}>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="avatar"
                            type="hidden"
                            component={CustomTextField}
                        />
                        <Field
                            name="username"
                            type="text"
                            component={CustomTextField}
                            label="Username"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="password"
                            type="password"
                            component={CustomTextField}
                            label="Password"
                            validate={[requiredValidation]}
                        />
                        <Field
                            name="confirm"
                            type="password"
                            component={CustomTextField}
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
    user: state.user.user,
    initialValues: state.user.user,
});

const mapDispatchToProps = (dispatch)  => ({
    changeAvatar: data => dispatch(changeAvatarAction(data)),
});

const connectedAccount = reduxForm({
    form: 'account',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(Account);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(connectedAccount));
