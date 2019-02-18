import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { DEFAULT_AVATAR } from '../../../../helpers/constants';

const styles = {
    avatar: {
        width: 150,
        height: 150,
    },
};

class UserAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: DEFAULT_AVATAR,
        };
    }

    static propTypes = {
        input: PropTypes.object,
        classes: PropTypes.object,
    };

    static defaultProps = {
        input: {},
        classes: {},
    };

    encodeImageFileAsURL = e => {
        const { input: { onChange } } = this.props;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            onChange(reader.result);
        };

        reader.readAsDataURL(file);
    };

    render() {
        const { input: { value }, classes } = this.props;

        return (
            <div className="picture-container">
                <div className="picture">
                    <Avatar alt="Remy Sharp" src={ value } classes={{ root: classes.avatar }} />
                    <input
                        type="file"
                        onChange={ e => this.encodeImageFileAsURL(e) }
                    />
                </div>
                <h6 className="description">Choose Picture</h6>
            </div>
        );
    }
}

export default withStyles(styles)(UserAvatar);
