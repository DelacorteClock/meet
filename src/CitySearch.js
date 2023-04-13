import React, {Component} from 'react';
import {InfoAlert} from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        shewSuggestions: undefined,
        infoText: ''
    }
    hdlInputChange = (evt) => {
        const value = evt.target.value;
        const suggestions = this.props.locations.filter(function (location) {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({query: value, suggestions: [], infoText: 'City Not Found: Check Spelling Or Look For Another One'});
        } else {
            this.setState({query: value, suggestions: suggestions, infoText: ''});
        }
    }
    hdlItemClick = (suggestion) => {
        this.setState({query: suggestion, shewSuggestions: false, infoText: ''});
        this.props.updateEvents(suggestion, 'BLANK');
    }
    render() {
        return (
            <div className='CitySearch'>
                <input type='text' className='city' placeholder='Search For City' value={this.state.query} onChange={this.hdlInputChange} onFocus={() => {this.setState({shewSuggestions: true});}} />
                <ul className='suggestions' style={this.state.shewSuggestions ? {} : {display: 'none'}}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.hdlItemClick(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all' className='allLine' onClick={() => this.hdlItemClick('all')}><b>See All Cities</b></li>
                </ul>
                <InfoAlert text={this.state.infoText} />
            </div>
        );
    }
}

export default CitySearch;