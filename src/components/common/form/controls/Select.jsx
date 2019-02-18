import React, { Fragment } from 'react';
import Select from 'react-select';

import { InputLabel, FormHelperText } from '@material-ui/core'

const SelectInput = props => {
    const { input, options, multiple, meta: { error }, label } = props;

    return (
        <Fragment>
            <InputLabel>{ label }</InputLabel>
            <Select
                options={options}
                isMulti={multiple}
                placeholder='Select'
                simpleValue
                error={!!(error)}
                helperText={error}
                onChange={input.onChange}
                value={input.value}
            />
            <FormHelperText>{ error }</FormHelperText>
        </Fragment>
    )
};

export default SelectInput;
