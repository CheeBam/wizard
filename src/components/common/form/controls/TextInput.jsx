import { TextField } from '@material-ui/core';
import React from 'react';

const TextInput = props => {
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

export default TextInput;
