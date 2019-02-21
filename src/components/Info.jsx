import React, {Component, Fragment} from 'react';
// import Button from '@material-ui/core/Button';
// eslint-disable-next-line
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DateTime } from 'luxon';

import { Grid, Avatar, IconButton, withStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { getUserAction, clearUserAction } from '../actions/userActions';
import { getHobbiesAction } from '../actions/staticActions';

import PageTitle from './PageTitle';

const styles = {
    avatar: {
        width: 200,
        height: 200,
        border: '2px solid blue',
        margin: 'auto',
    },
    partContainer: {
        display: 'flex',
        alignItems: 'baseline',
    },
    svg: {
        color: '#475666',
        width: 15,
        height: 15,
    },
    svgRed: {
        color: '#FF8989',
        width: 15,
        height: 15,
    },
    icon: {
        marginTop: '-3px',
    },
    background: {
        background: '#FAFCFF',
        padding: '35px 10px',
    },
    fontLabel: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#475666',
    },
    fontValue: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#657C9A',
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

    redirectTo = (link) => {
        return () => {
            const { history } = this.props;
            history.push(link);
        }
    };

    pageInfo() {
        const { hobbies, user: { phones } } = this.props;

        const passToStars = (string) => {
            return ''.padStart(string && string.length, '*');
        };

        const prepareSkills = (object) => {
            return object.length > 0 && object.map(item => item.label).join(', ');
        };

        const prepareHobbies = (list, object) => {
            return list.length > 0 && object.length > 0 && list.filter(item => object.includes(item.id)).map(item => item.label).join(', ');
        };

        const formatBirthday = (string) => {
            return string && DateTime.fromFormat(string, 'dd-MM-yy').toFormat('dd.MM.yy');
        };

        const preparePhone = (list, number) => {
            return list[number] ? list[number] : null;
        };

        return [
            {
                name: 'Account',
                link: 'account',
                data: [
                    {
                        field: 'username',
                        label: 'User name',
                    },
                    {
                        field: 'password',
                        label: 'Password',
                        callback: passToStars,
                    },
                ]
            },
            {
                name: 'Personal',
                link: 'profile',
                data: [
                    {
                        field: 'firstName',
                        label: 'First name',
                    },
                    {
                        field: 'lastName',
                        label: 'Last name',
                    },
                    {
                        field: 'birthday',
                        label: 'Birth date',
                        callback: formatBirthday,
                    },
                    {
                        field: 'email',
                        label: 'Email',
                    },
                    {
                        field: 'address',
                        label: 'Address',
                    },
                ]
            },
            {
                name: 'Contacts',
                link: 'contacts',
                data: [
                    {
                        field: 'company',
                        label: 'Company',
                    },
                    {
                        field: 'fax',
                        label: 'Fax',
                    },
                    {
                        field: 'facebook',
                        label: 'Facebook link',
                    },
                    {
                        field: 'github',
                        label: 'Github link',
                    },
                    {
                        field: 'phones',
                        label: 'Phone #1',
                        hidden: !Boolean(phones && phones[0]),
                        callback: preparePhone.bind(null, phones, 0),
                    },
                    {
                        field: 'phones',
                        label: 'Phone #2',
                        hidden: !Boolean( phones && phones[1]),
                        callback: preparePhone.bind(null, phones, 1),
                    },
                    {
                        field: 'phones',
                        label: 'Phone #3',
                        hidden: !Boolean(phones && phones[2]),
                        callback: preparePhone.bind(null, phones, 2),
                    },
                ]
            },
            {
                name: 'Capabilities',
                link: 'capabilities',
                data: [
                    {
                        field: 'skills',
                        label: 'Skills',
                        callback: prepareSkills,
                    },
                    {
                        field: 'hobbies',
                        label: 'Hobbies',
                        callback: prepareHobbies.bind(null, hobbies),
                    },
                    {
                        field: 'additional',
                        label: 'Additional Info',
                    },
                ]
            }
        ];
    }

    render() {
        const { user, classes } = this.props;

        const data = this.pageInfo();

        return (
            <Fragment>
                <PageTitle title={user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : ''} link={{ to: '/', label: 'Users List'}}/>
                <Grid
                    className={classes.background}
                    container
                    justify="center"
                >
                    <Grid item lg={4} md={12} xs={12}>
                        <Avatar alt="Remy Sharp" src={user.avatar} classes={{ root: classes.avatar }} />
                    </Grid>
                    <Grid item lg={8} md={12} xs={12}>
                        { data.map((item, key) => (
                            <Grid key={key} className={classes.partContainer}>
                                <Grid item lg={4} md={6} xs={6}>
                                    <p className={classes.fontLabel}>
                                        { item.name }
                                        &nbsp;
                                        <IconButton color="default" onClick={this.redirectTo(`/user/${item.link}/${user.id}`)} classes={{ root: classes.icon }} component="span">
                                            <Edit classes={{ root: classes.svg }} />
                                        </IconButton>
                                    </p>
                                </Grid>
                                <Grid key={key} container>
                                    { item.data.map((internalItem, key) => (
                                        internalItem.hidden ||
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <p className={classes.fontLabel}>
                                                        {internalItem.label}:
                                                    </p>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <p className={classes.fontValue}>
                                                        {internalItem.callback ? internalItem.callback(user[internalItem.field]) : user[internalItem.field]}
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

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

