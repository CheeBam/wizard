import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { DateTime} from 'luxon';
import { Link as RouterLink } from 'react-router-dom';

import {Table, IconButton, Link, TableBody, TableCell, TableHead, TableRow, Avatar, withStyles} from '@material-ui/core';
import { Edit, Close } from '@material-ui/icons';

import PageTitle from './PageTitle';
import { Button } from './common/form/buttons';
import Loading from '../assets/images/table_loading.svg';
import { getAllUsersAction, destroyUserAction } from "../actions/userActions";

const styles = {
    table: {
        tableLayout: 'fixed',
    },
    tableHead: {
        background: '#5787DD',
        '& tr th': {
            color: '#fff',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            fontSize: 14,
        }
    },
    tableBody: {
        '& tr td': {
            borderBottom: 'none',
        }
    },
    tableTopLine: {
        height: 30,
    },
    emptyTable: {
        background: '#FAFCFF',
        height: 400,
        textAlign: 'center',
        '& h3': {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: 'normal',
            fontSize: 35,
            textAlign: 'center',
            color: '#9BB0CB',
        },
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    fullNameLink: {
        marginBottom: 0,
        marginTop: '15px',
        whiteSpace: 'nowrap',
        fontSize: '17px',
        color: '#475666',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
    },
    avatar: {
        cursor: 'pointer',
    },
    svg: {
        color: '#B1BCC9',
        width: 15,
        height: 15,
    },
    svgRed: {
        color: '#FF8989',
        width: 15,
        height: 15,
    },
    icon: {
        padding: 0,
    },
    cellName: {
        padding: '4px 25px 4px 24px',
    },
    confirmDelete: {
        cursor: 'pointer',
        color: '#FF8989',
        marginTop: 13,
    },
};

class List extends PureComponent {

    state = {
        deleted: [],
    };

    componentDidMount() {
        const { getAll } = this.props;

        getAll({});
    }

    destroy = id => {
        return () => {
            const {deleted} = this.state;

            this.setState({
                deleted: [...deleted, id],
            })
        }
    };

    destroyCancel = id => {
        return () => {
            const {deleted} = this.state;

            this.setState({
                deleted: deleted.filter(item => item !== id),
            })
        }
    };

    destroyConfirm = id => {
        return () => {
            const { destroy } = this.props;
            destroy(id);
        };
    };

    redirectTo = (link) => {
        return () => {
            const { history } = this.props;
            history.push(link);
        }
    };

    renderTableBody() {
        const { classes, fetching, error, list } = this.props;
        const { deleted } = this.state;

        if (fetching) {
            return (
                <TableRow>
                    <TableCell colSpan={7} align={'center'}><img src={Loading} alt="Loading" /></TableCell>
                </TableRow>
            );
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={7} align="center">
                        <h3>Something went wrong...</h3>
                    </TableCell>
                </TableRow>
            );
        }

        if (list.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={7} className={classes.emptyTable}>
                        <div>
                            <h3>No users here :(</h3>
                            <Button width={160} name="Create new user" type='button'/>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        return (
            <Fragment>
                <TableRow className={classes.tableTopLine}><TableCell> </TableCell></TableRow>
                { list.map((row, index) => (
                    <TableRow key={row.id} style={{ background: index % 2 ? '#FFF' : '#E7F0FF', transform: deleted.includes(row.id) ? 'translateX(-100px)' : '', transition: 'transform .7s ease-out', }}>
                        <TableCell>
                            <Avatar alt="Remy Sharp" src={row.avatar} classes={{ root: classes.avatar }} onClick={this.redirectTo(`/info/${row.id}`)}/>
                        </TableCell>
                        <TableCell style={{ paddingLeft: 0 }}>
                            <div className={classes.nameContainer}>
                                <Link
                                    className={classes.fullNameLink}
                                    component={props => <RouterLink to={`/info/${row.id}`} {...props}/>}
                                >
                                    {row.firstName} {row.lastName}
                                </Link>
                                <p style={{ marginTop: 0 }}>{row.username}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {row.company}
                        </TableCell>
                        <TableCell>
                            { row.email}
                        </TableCell>
                        <TableCell>
                            { row.updatedAt ? DateTime.fromISO(row.updatedAt).toRelativeCalendar() : ''}
                        </TableCell>
                        <TableCell>
                            { deleted.includes(row.id)
                                ?
                                    (<IconButton color="default" onClick={this.destroyCancel(row.id)} classes={{ root: classes.icon }} component="span">
                                        <Close classes={{ root: classes.svgRed }} />
                                     </IconButton>)
                                :
                                    (<IconButton color="default" onClick={this.redirectTo(`/user/account/${row.id}`)} classes={{ root: classes.icon }} component="span">
                                        <Edit classes={{ root: classes.svg }} />
                                    </IconButton>)
                            }
                        </TableCell>
                        <TableCell align="center">
                            { deleted.includes(row.id)
                                ?
                                    (<p onClick={this.destroyConfirm(row.id)} className={classes.confirmDelete}>delete</p>)
                                :
                                    (<IconButton color="default" onClick={this.destroy(row.id)} classes={{root: classes.icon}}
                                                 component="span">
                                        <Close classes={{root: classes.svg}}/>
                                    </IconButton>)
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </Fragment>
        )
    }


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <PageTitle title='List of users'/>
                <Table classes={{ root: classes.table }}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell style={{ width: 5 }}> </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Contacts</TableCell>
                            <TableCell style={{ width: 100 }} >Last update</TableCell>
                            <TableCell style={{ width: 10, padding: '0 20px' }}> </TableCell>
                            <TableCell style={{ width: 25 }}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        { this.renderTableBody() }
                    </TableBody>
                </Table>
            </Fragment>
        );

    }
}
export default connect(
    state => ({
        error: state.user.error,
        fetching: state.user.fetching,
        meta: state.user.list.meta,
        list: state.user.list.data,
    }),
    dispatch => ({
        getAll: meta => dispatch(getAllUsersAction(meta)),
        destroy: id => dispatch(destroyUserAction(id)),
    })
)(withStyles(styles)(List));
