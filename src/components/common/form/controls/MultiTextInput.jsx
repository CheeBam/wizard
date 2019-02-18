import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';

const MultiTextInput = props =>{
    const { rows } = props;

    return (
        <TextInput
            { ...props }
            multiline
            rowsMax={rows}
        />
    );
};

MultiTextInput.propTypes = {
    rows: PropTypes.number,
};

MultiTextInput.defaultProps = {
    rows: 4,
};

export default MultiTextInput;
