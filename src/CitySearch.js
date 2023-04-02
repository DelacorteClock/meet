import React, {Component} from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: []
    }
    hdlInputChange = (evt) => {
        const value = evt.target.value;
        const suggestions = this.props.locations.filter(function (location) {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({query: value, suggestions: suggestions});
    }
    hdlItmClick = (suggestion) => {
        this.setState({query: suggestion});
    }
    render() {
        return (
            <div className='CitySearch'>
                <input type='text' className='city' value={this.state.query} onChange={this.hdlInputChange} />
                <ul className='suggestions'>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.hdlItmClick(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all'>See All Cities</li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;