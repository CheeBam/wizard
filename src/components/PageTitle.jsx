import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    pageTitleBlock: {
        display: 'flex',
        justifyContent: 'center',
        height: 100,
        alignItems: 'center',
    },
    pageTitle: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: 35,
        textAlign: 'center',
    },
};

const PageTitle = props => {
    const { title, classes } = props;

    return (
        <div className={classes.pageTitleBlock}>
            <Typography className={classes.pageTitle}>
                { title }
            </Typography>
        </div>
    );
};


export default withStyles(styles)(PageTitle);
