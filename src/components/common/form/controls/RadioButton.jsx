import {Radio} from "@material-ui/core";
import React from "react";

const RadioButton = props => {
    const { input, label, type, ...other } = props;

    return (
        <Radio
            color="primary"
            margin="normal"
            label={label}
            type={type}
            { ...input }
            { ...other }
        />
    )
};

export default RadioButton;
