import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import {Link, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import {Tab, Tabs, AppBar, Toolbar, Typography, Link as MaterialLink} from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {
    saveUserAction,
    updateUserAction,
    updateUserSuccessAction,
    getUserAction,
    saveDraftUserAction,
    getDraftUserAction,
    fillDraftUserAction,
    deleteDraftUserAction,
    clearUserAction,
} from '../../actions/userActions';

import PageTitle from './../PageTitle';
import Account from './Account';
import Profile from './Profile';
import Contacts from "./Contacts";
import Capabilities from "./Capabilities";

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
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbarString: {
        display: 'flex',
        alignItems: 'center',
    }
};

class Wrapper extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        step: 1,
    };

    constructor(props) {
        super(props);

        const { match: { params: { id } } } = props;

        this.state = {
            isEdit: Boolean(id),
        }
    }

    componentDidMount() {
        const { isEdit } = this.state;
        const { match: { params: { id } }, match: { url }, history, getUser, getDraftUser } = this.props;

        if (isEdit && id) {
            getUser(id);
        } else {
            getDraftUser();
            if (url !== '/user/account') {
                history.replace('/user/account');
            }
        }
    }

    componentWillUnmount() {
        const { saveDraftUser, form: { wizard: { values } } } = this.props;
        const { step, isEdit } = this.state;

        if (!isEdit) {
            saveDraftUser({ ...values, step });
        }
    }

    fillDraftFields = () => {
        const { fillDraftUser } = this.props;

        fillDraftUser();
    };

    clearDraftFields = () => {
        const { deleteDraftUser } = this.props;

        deleteDraftUser();
    };

    renderDraft() {
        const { draftExists, classes } = this.props;

        if (draftExists) {
            return (
                <AppBar position="static">
                    <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
                        <div className={classes.toolbarString}>
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
                        </div>
                        <MaterialLink
                            component="button"
                            variant="caption"
                            color="inherit"
                            onClick={this.clearDraftFields}
                        >
                            &#10006;
                        </MaterialLink>
                    </Toolbar>
                </AppBar>
            )
        }
    }

    handleSubmitMethod(nextName, nextStep) {
        const { match: { params: { id } }, updateUser, updateUserState, history } = this.props;

        return (data) => {
            try {
                if (Boolean(id)) {
                    updateUser(id, data);
                } else {
                    updateUserState(data);
                }
                this.setState({ step: nextStep });
                history.push(`/user/${nextName}/${id || ''}`);
            } catch (e) {
                console.log(e);
            }
        }
    }

    handleSubmitMethodWithSave() {
        const { match: { params: { id } }, updateUser, saveUser, history } = this.props;

        return async (data) => {
            try {
                if (Boolean(id)) {
                    updateUser(id, data)
                } else {
                    await saveUser(data);
                }
                history.push('/');
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        const { match: { params: { tab, id } }, classes } = this.props;
        const { step, isEdit } = this.state;

        return (
            <Fragment>
                <PageTitle title={isEdit ? 'Editing' : 'Add new user'} />
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
                        to={`/user/account/${id || ''}`}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="2. Profile"
                        value="profile"
                        component={Link}
                        to={`/user/profile/${id || ''}`}
                        disabled={!this.isEdit() && step < 2}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="3. Contacts"
                        value="contacts"
                        component={Link}
                        to={`/user/contacts/${id || ''}`}
                        disabled={!this.isEdit() && step < 3}
                    />
                    <Tab
                        classes={{
                            selected: classes.selected,
                        }}
                        label="4. Capabilities"
                        value="capabilities"
                        component={Link}
                        to={`/user/capabilities/${id || ''}`}
                        disabled={!this.isEdit() && step < 4}
                    />
                </Tabs>
                { this.renderDraft() }
                <Switch>
                    <Route path='/user/account/:id?' render={() => <Account onSubmit={this.handleSubmitMethod('profile', 2)} />} />
                    <Route path='/user/profile/:id?' render={() => <Profile onSubmit={this.handleSubmitMethod('contacts', 3)} />} />
                    <Route path='/user/contacts/:id?' render={() => <Contacts onSubmit={this.handleSubmitMethod('capabilities', 4)} />} />
                    <Route path='/user/capabilities/:id?' render={() => <Capabilities onSubmit={this.handleSubmitMethodWithSave()}/>} />
                </Switch>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    draftExists: state.draft.exists,
    draft: state.draft.user,
    form: state.form,
});

const mapDispatchToProps = (dispatch)  => ({
    saveUser: data => dispatch(saveUserAction(data)),
    updateUser: (id, values) => dispatch(updateUserAction({ id, values })),
    updateUserState: (data) => dispatch(updateUserSuccessAction(data)),
    getUser: id => dispatch(getUserAction(id)),
    saveDraftUser: data => dispatch(saveDraftUserAction(data)),
    getDraftUser: () => dispatch(getDraftUserAction()),
    fillDraftUser: () => dispatch(fillDraftUserAction()),
    deleteDraftUser: () => dispatch(deleteDraftUserAction()),
    clearUserState: () => dispatch(clearUserAction()),
});

export default Wrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Wrapper));
