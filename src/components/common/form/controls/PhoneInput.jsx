import React from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

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
                    onChange={input.onChange}
                />
            }
        </InputMask>
    )
};

export default PhoneField;
