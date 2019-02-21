import React from 'react';
import { DateTime } from 'luxon';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { TextInput } from './index';

const ReactDatePicker = props => {

    const { input } = props;

    return (
        <DatePicker
            style={{ width: 300 }}
            customInput={<TextInput {...props} />}
            {...input}
            onChange={(value) => {
                input.onChange(DateTime.fromJSDate(value).toFormat('dd-MM-yy'));
            }}
            dateForm='dd-MM-yy'
            selected={input.value ? DateTime.fromFormat(input.value, 'dd-MM-yy').toJSDate() : null}
        />
    );
};

export default ReactDatePicker;
