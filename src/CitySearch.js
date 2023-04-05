import React, {Component} from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        shewSuggestions: undefined
    }
    hdlInputChange = (evt) => {
        const value = evt.target.value;
        const suggestions = this.props.locations.filter(function (location) {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({query: value, suggestions: suggestions});
    }
    hdlItemClick = (suggestion) => {
        this.setState({query: suggestion, shewSuggestions: false});
        this.props.updateEvents(suggestion);
    }
    render() {
        return (
            <div className='CitySearch'>
                <input type='text' className='city' placeholder='Search For City' value={this.state.query} onChange={this.hdlInputChange} onFocus={() => {this.setState({shewSuggestions: true});}} />
                <ul className='suggestions' style={this.state.shewSuggestions ? {} : {display: 'none'}}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.hdlItemClick(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all' onClick={() => this.hdlItemClick('all')}><b>See All Cities</b></li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;