import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  pageLink: {
    position: 'absolute',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    fontSize: 24,
    color: '#9BB0CB',
    left: 0,
    textDecoration: 'none',
  },
};

const PageTitle = props => {
  const { title, link, classes } = props;

  return (
    <div className={classes.pageTitleBlock}>
      {link && (
        <Link className={classes.pageLink} to={link.to}>
          &lsaquo; {link.label}
        </Link>
      )}
      <Typography className={classes.pageTitle}>{title}</Typography>
    </div>
  );
};

PageTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.object,
};

export default withStyles(styles)(PageTitle);
