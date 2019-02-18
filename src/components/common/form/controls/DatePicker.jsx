import React from 'react';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => {
    return (
        <div>
            <DatePicker {...input} onChange={(value) => {
                input.onChange(DateTime.fromJSDate(value).toFormat('dd-MM-yy'));
            }} dateForm="dd-MM-yy" selected={input.value ? DateTime.fromFormat(input.value, 'dd-MM-yy').toJSDate() : null} />
            {touched && error && <span>{error}</span>}
        </div>
    );
};

export default ReactDatePicker;
