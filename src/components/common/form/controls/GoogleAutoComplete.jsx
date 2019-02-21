// GoogleAutocomplete.js
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';
import PlacesAutocomplete from 'react-places-autocomplete';
import { reduxForm } from 'redux-form';

import { scriptExists } from '../../../../helpers';
import { TextInput } from './index';

class GoogleAutocomplete extends React.Component {
  componentDidMount() {
    const url = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_API_KEY
    }&libraries=places`;

    if (!scriptExists(url)) {
      const script = document.createElement('script');
      script.src = url;
      script.async = 1;
      script.defer = 1;
      document.body.appendChild(script);
      script.onload = () => {
        this.setState({
          apiLoaded: true,
        });
      };
    } else {
      this.setState({
        apiLoaded: true,
      });
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

  handle = address => {
    const { input } = this.props;
    input.onChange(address);
  };

  render() {
    const { input, label, meta } = this.props;
    const { apiLoaded } = this.state;
    if (apiLoaded) {
      return (
        <PlacesAutocomplete
          value={input.value}
          onChange={this.handle}
          onSelect={this.handle}
          debounce={700}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <TextInput
                input={input}
                label={label}
                meta={meta}
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
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };

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
      return <div>Api doesn't loaded</div>;
    }
  }
}

export default (GoogleAutocomplete = reduxForm({
  form: 'profile',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(GoogleAutocomplete));
