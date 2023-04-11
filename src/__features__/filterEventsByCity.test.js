import {loadFeature, defineFeature} from 'jest-cucumber';
import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../App';
import {fakeData} from '../fake-data';
import CitySearch from '../CitySearch';
import {extractLocations} from '../api';

const feature = loadFeature('./src/__features__/filterEventsByCity.feature');

defineFeature(feature, function (test) {
    test('When user didn\'t search city shew upcoming events from all cities.', ({given, when, then}) => {
        given('that user didn\'t search for any city', function () {

        });
        var AppWrapper;
        when('the user opens the app', function () {
            AppWrapper = mount(<App />);
        });
        then('the user should see the list of upcoming events', function () {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(25);
        });
    });
    test('User should see list of suggestions after searching for city', ({given, when, then}) => {
        var locations, CitySearchWrapper;
        given('that the main page is open', function () {
            locations = extractLocations(fakeData);
            CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={function () {}} />);
        });
        when('the user starts typing in the city textbox', function () {
            const eventObject = {target: {value: 'Du'}};
            CitySearchWrapper.find('.city').simulate('change', eventObject);
        });
        then('the user should receive a list of cities (suggestions) which match what the user typed', function () {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });
    test('User can select a city from the suggested list', ({given, and, when, then}) => {
        var AppWrapper;
        given('that user was typing \'Du\' in the city textbox', async function () {
            AppWrapper = await mount(<App />);
            const eventObject = {target: {value: 'Du'}};
            AppWrapper.find('.city').simulate('change', eventObject);
        });
        and('the list of suggested cities is shewing', function () {
             AppWrapper.update();
             expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });
        when('the user selects a city (eg \'Dubai - United Arab Emirates\') from the list', function () {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });
        then('the city should be changed to that city (ie \'Dubai - United Arab Emirates\')', function () {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Dubai - United Arab Emirates');
        });
        and('the user should receive a list of upcoming events in that city', function () {
            expect(AppWrapper.find('.event')).toHaveLength(25);
        });
    });
});