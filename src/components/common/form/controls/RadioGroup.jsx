import React, { Component } from 'react';
import { Radio, FormControlLabel, FormHelperText } from '@material-ui/core';

class RadioGroup extends Component {
    render() {
        const { input, meta: { touched, error }, options } = this.props;

        return (
            <div>
                { options.map(o =>
                    <FormControlLabel
                        key={o.value}
                        control={<Radio
                            color="primary"
                            margin="normal"
                            label={o.title}
                            type="radio"
                            { ...input }
                            checked={o.value === input.value}
                            value={o.value}
                        />}
                        label={o.title}
                    />
                )}
                { touched && error && <FormHelperText>{ error }</FormHelperText> }
            </div>
        );
    }
}

export default RadioGroup;
