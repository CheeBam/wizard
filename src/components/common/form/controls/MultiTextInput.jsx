import TextInput from './TextInput';
import React from 'react';

const MultiTextInput = props => {

    return (
        <TextInput
            { ...props }
            multiline
            rowsMax="4"
        />
    )
};
//TODO: rowMax props
// def props 4
// index.js def exp

export default MultiTextInput;
