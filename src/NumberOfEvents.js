import React, {Component} from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
    state = {
        quantity: '25',
        infoText: ''
    }
    hdlInputChange = (evt) => {
        const value = evt.target.value;
        if (parseInt(value) > 0 && parseInt(value) < 1001) {
            this.setState({quantity: value, infoText: ''});
            this.props.updateEvents('BLANK', value);
        } else if (parseInt(value) < 1 || parseInt(value) > 1000) {
            this.setState({quantity: value, infoText: 'Value Must Be From 1 To 1 000'});
        } else {
            this.setState({quantity: value, infoText: 'Box Must Contain Integer '});
        }
    }
    render() {
        return (
            <div className='NumberOfEvents'>
                <input type='number' className='quantity' min='1' value={this.state.quantity} onChange={this.hdlInputChange} />
                <ErrorAlert text={this.state.infoText} />
            </div>
        );
    }
}

export default NumberOfEvents;