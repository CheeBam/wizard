import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import logo from '../assets/images/logo.png';
import list from '../assets/images/list_logo.svg';
import add from '../assets/images/add.svg';

const styles = {
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#4171C9',
        height: 60,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    logo: {
        background: `url(${logo}) no-repeat`,
        width: 110,
        height: 20,
    },
    list: {
        background: `url(${list}) no-repeat`,
    },
    tabRoot: {
        '&$tabSelected': {
            borderBottom: 'none',
        },
    }
};

class Header extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes, handleChange } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.logo}/>
                        <Tabs variant="fullWidth"
                              value="add"
                              onChange={handleChange}
                              TabIndicatorProps={{
                                  style: {
                                      backgroundColor: "white"
                                  }
                              }}
                        >
                            <Tab value="add"
                                 label="Add new user"
                                 icon={<img alt="add" className={classes.svg} src={add}/>}
                                 component={Link}
                                 to="/user/account" />
                            <Tab value="list"
                                 label="List of users"
                                 icon={<img alt="list" className={classes.svg} src={list}/>}
                                 component={Link}
                                 to="/" />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
