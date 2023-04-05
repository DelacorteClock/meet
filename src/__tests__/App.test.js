import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import {fakeData} from '../fake-data';
import {extractLocations, getEvents} from '../api';

describe('<App /> component', function () {
    var AppWrapper;
    beforeAll(function () {
        AppWrapper = shallow(<App />);
    });
    test('render EventList', function () {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    test('render CitySearch', function () {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
    test('render NumberOfEvents', function () {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

describe('<App /> integration', function () {
    test('App passes events state like prop to EventList', function () {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    test('App passes locations state like prop to CitySearch', function () {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
    test('get list of events matching city selected', async function () {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(fakeData);
        CitySearchWrapper.setState({suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().hdlItemClick(selectedCity);
        const allEvents = await getEvents();
        const eventsToShew = allEvents.filter(function (event) {
            return event.location === selectedCity;
        });
        expect(AppWrapper.state('events')).toEqual(eventsToShew);
        AppWrapper.unmount();
    });
    test('change in NumberOfEvents updates quantity state', async function () {
        const AppWrapper = mount(<App />);
        const NumWrapper = AppWrapper.find(NumberOfEvents);
        await NumWrapper.find('.quantity').simulate('change', {target: {value: '5'}});
        expect(AppWrapper.state('quantity')).toBe('5');
        AppWrapper.unmount();
    });
    test('change in NumberOfEvents updates state representing events displayed', async function () {
        const AppWrapper = mount(<App />);
        const NumWrapper = AppWrapper.find(NumberOfEvents);
        const EventListWrapper = AppWrapper.find(EventList);
        await NumWrapper.instance().hdlInputChange({target: {value: '3'}});
        await getEvents();
        expect(AppWrapper.state('events')).toEqual([fakeData[0],fakeData[1],fakeData[2]]);
        AppWrapper.unmount();
    });
});