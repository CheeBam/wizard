import React, {Component, Fragment} from 'react';
// import Button from '@material-ui/core/Button';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';

import { Grid, Avatar, Link as MaterialLink, withStyles } from '@material-ui/core';

import { getUserAction, clearUserAction } from '../actions/userActions';
import { getHobbiesAction } from '../actions/staticActions';

import {Link} from "react-router-dom";
import PageTitle from './PageTitle';

const styles = {
    avatar: {
        width: 200,
        height: 200,
        border: '2px solid blue',
    },
};

class Info extends Component {

    componentDidMount() {
        const { match: {params: {id}} , getUser, getHobbies } = this.props;
        getHobbies();
        getUser(id);
    }

    componentWillUnmount() {
        const { clearUser } = this.props;

        clearUser();
    }

    toEdit(part) {
        return () => {
            const { history, match: {params: {id}} } = this.props;

            history.push(`/user/${part}/${id}`);
        };
    }

    render() {
        const { user, classes, hobbies } = this.props;

        //TODO: make map of users - make 4 chunks with chunk name, field visibility, name, value

        return (
            <Fragment>
                <PageTitle title={user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : ''}/>
                <Link to={'/'} >To users list</Link>
                <Grid
                    container
                    spacing={8}
                    justify="center"
                >
                    <Grid item lg={4} md={6} xs={6}>
                        <Avatar alt="Remy Sharp" src={user.avatar} classes={{ root: classes.avatar }} />
                    </Grid>
                    <Grid item lg={8} md={6} xs={6}>

                        <Grid
                            container
                            spacing={8}
                        >
                            <Grid item lg={4} md={6} xs={6}>
                                <p>Account</p>
                                <MaterialLink
                                    component="button"
                                    variant="caption"
                                    color="inherit"
                                    onClick={this.toEdit('account')}
                                >
                                    edit
                                </MaterialLink>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>Username:</p>
                                <p>Password:</p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>{ user.username } sklfd jaksdn lkajsnd alsdn klansdklam, sdjnasl kjdnalskjdnasndlk ansdjnals kdnaskd</p>
                                <p>{ ''.padStart(user.password && user.password.length, '*')}</p>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={8}
                        >
                            <Grid item lg={4} md={6} xs={6}>
                                <p>Personal</p>
                                <MaterialLink
                                    component="button"
                                    variant="caption"
                                    color="inherit"
                                    onClick={this.toEdit('profile')}
                                >
                                    edit
                                </MaterialLink>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>First name:</p>
                                <p>Last name:</p>
                                <p>{ user.birthday ? 'Birthday:' : '' }</p>
                                <p>Email:</p>
                                <p>Address:</p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>{ user.firstName }</p>
                                <p>{ user.lastName }</p>
                                <p>{ user.birthday }</p>
                                <p>{ user.email }</p>
                                <p>{ user.address }</p>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={8}
                        >
                            <Grid item lg={4} md={6} xs={6}>
                                <p>Contacts</p>
                                <MaterialLink
                                    component="button"
                                    variant="caption"
                                    color="inherit"
                                    onClick={this.toEdit('contacts')}
                                >
                                    edit
                                </MaterialLink>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>{ user.company ? 'Company:' : '' }</p>
                                <p>{ user.fax ? 'Fax:' : '' }</p>
                                <p>{ user.facebook ? 'Facebook link:' : '' }</p>
                                <p>{ user.github ? 'Github link:' : '' }</p>
                                { Immutable.asMutable(user.phones)
                                    .map((item, i) => (item && item.length > 0 && <p key={i}>{`Phone #${++i}`}</p>))
                                }
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>{ user.company }</p>
                                <p>{ user.fax }</p>
                                <p>{ user.facebook }</p>
                                <p>{ user.github }</p>
                                { Immutable.asMutable(user.phones)
                                    .map((item, i) => (item && item.length > 0 && <p key={i}>{ item.toString() }</p>))
                                }
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={8}
                        >
                            <Grid item lg={4} md={6} xs={6}>
                                <p>Capabilities</p>
                                <MaterialLink
                                    component="button"
                                    variant="caption"
                                    color="inherit"
                                    onClick={this.toEdit('capabilities')}
                                >
                                    edit
                                </MaterialLink>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>{ user.skills.length > 0 ? 'Skills:' : '' }</p>
                                <p>{ user.hobbies.length > 0 ? 'Hobbies:' : '' }</p>
                                <p>{ user.additional ? 'Additional:' : '' }</p>
                            </Grid>
                            <Grid item lg={4} md={6} xs={6}>
                                <p>
                                   { user.skills.length > 0 && user.skills.map(item => item.label).join(',')}
                                </p>
                                <p>{ user.hobbies.length > 0 && hobbies.filter(item => user.hobbies.includes(item.id)).map(item => item.label).join(', ') }</p>
                                <p>{ user.additional }</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    hobbies: state.static.hobbies,
});

const mapDispatchToProps = (dispatch)  => ({
    getUser: id => dispatch(getUserAction(id)),
    clearUser: () => dispatch(clearUserAction()),
    getHobbies: () => dispatch(getHobbiesAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Info));

