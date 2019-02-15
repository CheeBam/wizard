import { InputAdornment, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
    eye: {
        cursor: 'pointer',
    },
});

class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordIsMasked: true,
        };
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
            passwordIsMasked: !prevState.passwordIsMasked,
        }));
    };

    render() {
        const { classes, input, label, meta: { touched, error } } = this.props;
        const { passwordIsMasked } = this.state;

        return (
            <TextField
                type={passwordIsMasked ? 'password' : 'text'}
                { ...input }
                variant="outlined"
                fullWidth={true}
                margin="normal"
                label={label}
                error={!!(touched && error)}
                helperText={touched && error}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <RemoveRedEye
                                className={classes.eye}
                                onClick={this.togglePasswordMask}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
}

PasswordInput.propTypes = {
    classes: PropTypes.object.isRequired,
    // onChange: PropTypes.func.isRequired,
    // value: PropTypes.func.isRequired,
};

export default withStyles(styles)(PasswordInput);
