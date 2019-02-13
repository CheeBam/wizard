import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { DateTime} from 'luxon';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import {Table, TableBody, TableCell, TableHead, TableRow, Button, Avatar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import PageTitle from './PageTitle';
import { getAllUsersAction, destroyUserAction } from "../actions/userActions";

// import { getTask, clearTask } from '../actions/task';

const styles = {
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

};

class List extends Component {
    componentDidMount() {
        const { getAll } = this.props;

        getAll({});
    }

    destroy = id => {
        return () => {
            const { destroy } = this.props;
            destroy(id);
        };
    };

    renderTableBody() {
        const { classes, fetching, error, list } = this.props;

        if (fetching) {
            return (
                <TableRow>
                    <TableCell>Loading...</TableCell>
                </TableRow>
            );
        } else if (error) {
            return (
                <TableRow>
                    <TableCell>Error</TableCell>
                </TableRow>
            );
        } else {
            return (
                list.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Avatar alt="Remy Sharp" src={row.avatar}/>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    marginLeft: '20px',
                                }}>
                                    <Link
                                        style={{
                                            marginBottom: 0,
                                            marginTop: '15px',
                                            whiteSpace: 'nowrap',
                                            fontSize: '17px',
                                            fontWeight: '800',
                                        }}
                                        component={
                                        props => <RouterLink to={`/info/${row.id}`} {...props}/>

                                    }>
                                        {row.firstName} {row.lastName}
                                    </Link>
                                    <p style={{
                                        marginTop: 0,
                                    }}>
                                        {row.username}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {row.company}
                        </TableCell>
                        <TableCell>
                            {row.email}
                        </TableCell>
                        <TableCell>
                            { row.updatedAt ? DateTime.fromISO(row.updatedAt).toRelativeCalendar() : ''}
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                to={`/user/account/${row.id}`}
                                component={RouterLink}
                            >
                                Info
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={this.destroy(row.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            )
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <PageTitle title='List of users'/>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align={"center"}>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Last update</TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
