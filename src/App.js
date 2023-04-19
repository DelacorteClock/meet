import React, {Component} from 'react';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import StartScreen from './StartScreen';
import {getEvents, extractLocations, checkToken, getAccessToken} from './api';
import {WarningAlert} from './Alert';

class App extends Component {
    state = {
        events: [],
        locations: [],
        locationChoice: 'all',
        quantity: '25',
        online: navigator.onLine,
        revealStartScreen: undefined
    }
    updateEvents = (location, eventQuantity) => {
        const {locationChoice, quantity} = this.state;
        if (location === 'BLANK' && eventQuantity) {
            getEvents().then((events) => {
                const revealableEvents = (locationChoice === 'all') ? events.slice(0, parseInt(eventQuantity)) : events.filter(function (event) {
                    return event.location === locationChoice;
                }).slice(0, parseInt(eventQuantity));
                this.setState({events: revealableEvents, quantity: eventQuantity});
            });
        } else if (location && eventQuantity === 'BLANK') {
            getEvents().then((events) => {
                const revealableEvents = (location === 'all') ? events.slice(0, parseInt(quantity)) : events.filter(function (event) {
                    return event.location === location;
                }).slice(0, parseInt(quantity));
                this.setState({events: revealableEvents, locationChoice: location});
            });
        }
    }
    onlineStatusGenerate = () => {
        if (navigator.onLine) {
            this.setState({online: true});
            console.log('ONLINE', new Date());
        } else {
            this.setState({online: false});
            console.log('OFFLINE', new Date());
        }
    }
    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({revealStartScreen: !(code || isTokenValid)});
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    var someEvents = events.slice(0, parseInt(this.state.quantity));
                    this.setState({events: someEvents, locations: extractLocations(events)});
                }
            });
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        if (this.state.revealStartScreen === undefined) {
            return <div className='App' />;
        } 
        window.addEventListener('online', this.onlineStatusGenerate);
        window.addEventListener('offline', this.onlineStatusGenerate);
        return (
                <div className='App'>
                    <h1>EdgyEvents by TheLeathers</h1>
                    <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                    <NumberOfEvents updateEvents={this.updateEvents} />
                    <WarningAlert text={this.state.online ? '' : 'No Internet: App Might Not Contain Current Event List'} />
                    <EventList events={this.state.events} />
                    <StartScreen revealStartScreen={this.state.revealStartScreen} getAccessToken={function () {getAccessToken();}} />
                </div>
                );
    }
}

export default App;