import React from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from "@material-ui/core";

import { buttonStyle } from './styles.jsx';

const CustomButton = props =>{
    const { name, type, classes, background, width, ...other } = props;

    return (
        <Button
            classes={{ root: classes.root }}
            style={{
                background,
                width,
            }}
            variant="contained"
            type={type}
            { ...other }
        >
            { name }
        </Button>
    );
};

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
    background: PropTypes.string,
    width: PropTypes.number,
};

CustomButton.defaultProps = {
    background: '#4B8DF8',
    width: 100,
};

export default withStyles(buttonStyle)(CustomButton);
