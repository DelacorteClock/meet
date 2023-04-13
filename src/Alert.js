import React, {Component} from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.colour = null;
        this.separated = null;
    }
    getStyle = function () {
        return {color: this.colour};
    }
    render() {
        return <div className='Alert'><p style={this.getStyle()}>{this.separated ? (this.props.text ? <br /> : <div></div>) : (<div></div>)}{this.separated ? (this.props.text ? <br /> : <div></div>) : (<div></div>)}{this.props.text}</p></div>;
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.colour = 'rgb(0,15,159)';
        this.separated = true;
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.colour = 'rgb(225,37,27)';
        this.separated = false;
    }
}

export {InfoAlert, ErrorAlert};