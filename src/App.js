import React, {Component} from 'react';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import StartScreen from './StartScreen';
import EventStyle from './EventStyle'
import {getEvents, extractLocations, checkToken, getAccessToken} from './api';
import {WarningAlert} from './Alert';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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
    getDatums = function () {
        const {locations, events} = this.state;
        const datums = locations.map(function (location) {
            const number = events.filter(function (event) {return event.location === location;}).length;
            const city = location.split(', ').shift();
            console.log({city: city, number: number});
            return {city: city, number: number};
        });
        return datums;
    }
    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken) === 'BAD') ? false : ((await checkToken(accessToken)).error ? false : true);
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        if (code) {console.log('CODE', code, isTokenValid, localStorage.getItem('access_token'), checkToken(accessToken));} else {console.log('NO CODE', isTokenValid, localStorage.getItem('access_token'), checkToken(accessToken));};
        console.log(this.getDatums());
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
                    <div className='data-vis-wrapper'>
                        <EventStyle events={this.state.events} />
                        <ResponsiveContainer height={350}>
                            <ScatterChart margin={{top: 15, right: 15, bottom: 15, left: 15}}>
                                <CartesianGrid />
                                <XAxis type='category' dataKey='city' name='City' />
                                <YAxis type='number' dataKey='number' name='Event Count' allowDecimals={false} />
                                <Tooltip cursor={{strokeDasharray: '3 3'}} />
                                <Scatter data={this.getDatums()} fill="#000000" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <EventList events={this.state.events} />
                    <StartScreen revealStartScreen={this.state.revealStartScreen} getAccessToken={() => {getAccessToken();}} />
                </div>
                );
    }
}

export default App;