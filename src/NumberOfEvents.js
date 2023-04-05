import React, {Component} from 'react';

class NumberOfEvents extends Component {
    state = {
        quantity: '25'
    }
    hdlInputChange = (evt) => {
        const value = evt.target.value;
        if (!isNaN(parseInt(value))) {
            this.setState({quantity: value});
            this.props.updateEvents('BLANK', value);
        }
    }
    render() {
        return (
            <div className='NumberOfEvents'>
                <input type='number' className='quantity' min='1' value={this.state.quantity} onChange={this.hdlInputChange} />
            </div>
        );
    }
}

export default NumberOfEvents;