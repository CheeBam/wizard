// GoogleAutocomplete.js
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, TextField, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { change } from 'redux-form';
import PlacesAutocomplete from 'react-places-autocomplete';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";

import { scriptExists } from '../../helpers';

class GoogleAutocomplete extends React.Component {

    componentDidMount() {
        const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;

        if (!scriptExists(url)) {
            const script = document.createElement('script');
            script.src = url;
            script.async = 1;
            script.defer = 1;
            document.body.appendChild(script);
            script.onload = () => {
                this.setState({
                    apiLoaded: true,
                })
            }
        } else {
            this.setState({
                apiLoaded: true,
            })
        }
    }

    state = {
        address: '',
        apiLoaded: false,
    };

    static propTypes = {
        input: PropTypes.object,
        classes: PropTypes.object,
    };

   static defaultProps = {
        input: {},
        classes: {},
    };

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.props.dispatch(change('profile', 'address', address)); //TODO: REFACTOR
        this.setState({ address });
    };

    render() {
        const { input, label, meta: { touched, error }, ...other } = this.props;
        const { apiLoaded } = this.state;
        if (apiLoaded) {
            return (
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    debounce={700}
                >
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <TextField
                                variant="outlined"
                                fullWidth={true}
                                margin="normal"
                                label={label}
                                type="text"
                                placeholder="Search Places ..."
                                className="location-search-input"
                                error={!!(touched && error)}
                                {...getInputProps()}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                <Paper square>
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';

                                        const style = suggestion.active
                                            ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                            : {backgroundColor: '#ffffff', cursor: 'pointer'};

                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </Paper>
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            );
        } else {
            return null;
        }
    }
}

GoogleAutocomplete = reduxForm({
    form: 'profile',
    destroyOnUnmount: false,
    enableReinitialize : true,
})(GoogleAutocomplete);

export default connect(null, null)(GoogleAutocomplete);


