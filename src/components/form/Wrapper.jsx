import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {Tab, Tabs, TextField, AppBar, Toolbar, Typography, Link as MaterialLink} from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import PageTitle from './../PageTitle';
import Account from './Account';
import Profile from './Profile';

import {
    saveUserAction,
    updateUserAction,
    updateUserSuccessAction,
    getUserAction,
    saveDraftUserAction,
    getDraftUserAction,
    fillDraftUserAction,
    clearUserAction,
} from '../../actions/userActions';
import Contacts from "./Contacts";
import Capabilities from "./Capabilities";

import seeder from '../../database/seeder';

const styles = {
    tabs: {
        background: '#EBF1FC',
    },
    selected: {
        background: '#5787DD',
    },
    indicator: {
        background: 'transparent',
    },
};

class Wrapper extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        step: 1,
    };

    componentDidMount() {
        const { match: {params: {id}} , getUser, getDraftUser } = this.props;

        if (this.isEdit()) {
            if (id) {
                getUser(id);
            }
        } else {

            const { match, history } = this.props;

            console.log(match);

            if (match.url !== '/user/account') {
                // history.replace('/user/account');
            }

            getDraftUser();
        }
    }

    componentWillUnmount() {
        const { saveDraftUser, user } = this.props;
        const { step } = this.state;

         if (!this.isEdit()) {
             saveDraftUser({ ...user, step });
         }
    }

    isEdit() {
        const {match: {params: { id }}} = this.props;
        return Boolean(id);
    }

    fillDraftFields = () => {
        console.log('fill');
        const { fillDraftUser } = this.props;

        fillDraftUser();
    };

    renderDraft() {
        const { draftExists } = this.props;

        if (draftExists) {
            return (
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="caption" color="inherit">
                            You have an unsaved user data. Do you want to complete it?
                        </Typography>
                        &nbsp;
                        <MaterialLink
                            component="button"
                            variant="caption"
                            color="inherit"
                            onClick={this.fillDraftFields}
                        >
                            Continue
                        </MaterialLink>
                    </Toolbar>
                </AppBar>
            )
        }
    }

    renderPage() {
        const { match: { params: { id, tab } }, saveUser, updateUser, updateUserState, clearUserState, history, user } = this.props;

        switch (tab) {
            case 'account': {
                const method = (data) => {
                    try {
                        this.isEdit() ? updateUser(id, data) : updateUserState(data);
                        this.setState({ step: 2 });
                        history.push(`/user/profile${this.isEdit() ? `/${id}` : ''}`);
                    } catch (e) {
                        console.log(e);
                    }
                };
                return (<Account onSubmit={method} />);
            }
            case 'profile': {
                const method = (data) => {
                    try {
                        this.isEdit() ? updateUser(id, data) : updateUserState(data);
                        this.setState({ step: 3 });
                        history.push(`/user/contacts${this.isEdit() ? `/${id}` : ''}`);
                    } catch (e) {
                        console.log(e);
                    }
                };
                return (<Profile onSubmit={method} />);
            }
            case 'contacts': {
                const method = (data) => {
                    try {
                        this.isEdit() ? updateUser(id, data) : updateUserState(data);
                        this.setState({ step: 4 });
                        history.push(`/user/capabilities${this.isEdit() ? `/${id}` : ''}`);
                    } catch (e) {
                        console.log(e);
                    }
                };
                return (<Contacts onSubmit={method} isEdit={this.isEdit()} />);
            }
            case 'capabilities': {
                const method = async (data) => {
                    try {
                        if (this.isEdit()) {
                            updateUser(user.id, data)
                        } else {
                            await saveUser(data);
                            clearUserState();
                        }
                        history.push('/');
                    } catch (e) {
                        console.log(e);
                    }
                };
                return (<Capabilities onSubmit={method} />);
            }
            default:
                return (<div>Not found</div>);
        }
    };

    render() {
        const { classes } = this.props;
        const { step } = this.state;

        const pageTitle = this.isEdit() ? 'Editing' : 'Add new user';

        const { match: { params: { tab, id } } } = this.props;

        return (
            <Fragment>
                <PageTitle title={pageTitle} />
                <Tabs value={tab}
                      classes={{
                          root: classes.tabs,
                          indicator: classes.indicator,
                      }}
                      variant="fullWidth">
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="1. Account"
                        value="account"
                        component={Link}
                        to={`/user/account${this.isEdit() ? `/${id}` : ''}`}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="2. Profile"
                        value="profile"
                        component={Link}
                        // disabled={!this.isEdit() && step < 2}
                        to={`/user/profile${this.isEdit() ? `/${id}` : ''}`}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="3. Contacts"
                        value="contacts"
                        component={Link}
                        to={`/user/contacts${this.isEdit() ? `/${id}` : ''}`}
                        // disabled={!this.isEdit() && step < 3}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="4. Capabilities"
                        value="capabilities"
                        component={Link}
                        to={`/user/capabilities${this.isEdit() ? `/${id}` : ''}`}
                        // disabled={!this.isEdit() && step < 4}
                    />
                </Tabs>
                { this.renderDraft() }
                { this.renderPage() }
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    draftExists: state.draft.exists,
    draft: state.draft.user,
});

const mapDispatchToProps = (dispatch)  => ({
    saveUser: data => dispatch(saveUserAction(data)),
    updateUser: (id, values) => dispatch(updateUserAction({ id, values })),
    updateUserState: (data) => dispatch(updateUserSuccessAction(data)),
    getUser: id => dispatch(getUserAction(id)),
    saveDraftUser: data => dispatch(saveDraftUserAction(data)),
    getDraftUser: () => dispatch(getDraftUserAction()),
    fillDraftUser: () => dispatch(fillDraftUserAction()),
    clearUserState: () => dispatch(clearUserAction()),
});

export default Wrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Wrapper));



/*

renderTabs() {
        const { classes } = this.props;

        const tabs = [
            {
                id: 1,
                name: 'account',
            },
            {
                id: 2,
                name: 'profile',
            },
            {
                id: 3,
                name: 'contacts',
            },
            {
                id: 4,
                name: 'capabilities',
            },
        ];

        return (tabs.map((tab) => {
            const { id, name } = tab;
            return (<Tab
                key={id}
                classes={{
                    selected: classes.selected,
                }}
                label={`${id}. ${name}`}
                value={name}
                component={Link}
                to={name}
            />);
        }));
    }

 */
