import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { DEFAULT_AVATAR } from '../../../../helpers/constants';

import { styles } from './styles.jsx';
import { imageValidation } from "../../../../utils";

class UserAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: DEFAULT_AVATAR,
        };
    }

    state = {
        error: null,
    };

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

        if (file) {
            reader.onloadend = async () => {
                const validate = await imageValidation(reader.result);

                if (validate == null) {
                    onChange(reader.result);
                } else {
                    this.setState({ error: validate });
                }
            };

            reader.readAsDataURL(file);
        }
    };

    render() {
        const { input: { value }, classes } = this.props;
        const { error } = this.state;

        return (
            <div className="picture-container">
                <div className={classes.picture}>
                    <Avatar alt="Remy Sharp" src={ value } classes={{ root: classes.avatar }} />
                    <div className={classes.uploadBtnWrapper}>
                        <button className={classes.uploadBtn}>+ add avatar</button>
                        <input type="file" onClick={ () => { (this.setState({ error: null })) } } onChange={ e => this.encodeImageFileAsURL(e) } />
                    </div>
                    { error && (<p className={classes.avatarErrorMessage}>{ error }</p>) }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserAvatar);
