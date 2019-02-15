import React from "react";
import Select from 'react-select';

const SelectInput = props => {
    const { input, options, multiple, meta: { touched, error } } = props;

    return (
        <Select
            options={options}
            isMulti={multiple}
            placeholder="Select"
            simpleValue
            error={!!(touched && error)}
            helperText={touched && error}
            onChange={input.onChange}
        />
    )
};

export default SelectInput;
