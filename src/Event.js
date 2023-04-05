import React, {Component} from 'react';

/***
 * For any event... 
 * 'summary' is the title, 
 * 'start.dateTime' is date/time, 
 * 'start.timeZone' is time zone,
 * 'htmlLink' is link and
 * 'description' is description 
 * ***/

class Event extends Component {
    state = {
        exp: false
    }
    hdlTogglerClick = () => {
        this.setState((oldState) => ({
            exp: !oldState.exp
        }));
    }
    render() {
        const {event} = this.props;
        return (
            <div className='event'>
                <h2 className='eventTitle'>{event.summary}</h2>
                <p className='timeInfo'><span className='dateAndTime'>{event.start.dateTime}</span> (<span className='timeZone'>{event.start.timeZone}</span>) in <span className='locationInfo'>{event.location}</span></p>
                {this.state.exp ? <div className='extraDetails'>
                    <h3 className='extraHead'>More Info</h3>
                    <a className='extraLink' href={event.htmlLink}>View Info On Google Calendar</a>
                    <p className='extraParagraph'>{event.description}</p>
                </div> : <div></div>}
                <button className='toggler' onClick={this.hdlTogglerClick}>{this.state.exp ? 'Collapse Extra Details' : 'Expand Extra Details'}</button>
            </div>);
    }
}

export default Event;