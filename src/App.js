import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import List from './components/List';
import Wrapper from './components/form/Wrapper';
import Info from './components/Info';
import Header from './components/Header';

const styles = {
    container: {
        maxWidth: 970,
        margin: '0 auto',
        position: 'relative',
    },
};

class App extends Component {

    constructor() {
        super();


        let temp = window.location.hash.split('/')[1];

        if (temp === '') {
            temp = 'list'
        }

        this.state = {
            value: temp,
        }

    }

    state = {
        value: '',
    };

    onHandleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const { classes } = this.props;

        return (
            <div id='app'>
                <Header value={value} handleChange={this.onHandleChange} />
                <div className={classes.container}>
                    <Switch>
                        <Route path="/info/:id" component={Info} />
                        <Route path="/user/:tab/:id?" component={Wrapper} />
                        <Route path="/" component={List} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);
