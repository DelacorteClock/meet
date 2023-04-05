/* global expect */

import React from 'react';
import {shallow} from 'enzyme';
import CitySearch from '../CitySearch';
import {fakeData} from '../fake-data';
import {extractLocations} from '../api';

describe('<CitySearch /> component', function () {
    var locations, CitySearchWrapper;
    beforeAll(function () {
        locations = extractLocations(fakeData); 
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={function () {}} />);
    });
    test('render text box', function () {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });
    test('render recommendation list', function () {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });
    test('render text input correctly', function () {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });
    test('change state with change in input', function () {
        CitySearchWrapper.setState({
            query: 'SpaceSuit'
        });
        const eventObject = {target: {value: 'LeatherPants'}};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('LeatherPants');
    });
    test('render suggestion list correctly', function () {
        const locations = extractLocations(fakeData);
        CitySearchWrapper.setState({suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (var i = 0; i < suggestions.length; i++) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });
    test('suggestion list matches query after change', function () {
        CitySearchWrapper.setState({query: '', suggestions: []});
        CitySearchWrapper.find('.city').simulate('change', {target: {value: 'Lon'}});
        const query = CitySearchWrapper.state('query');
        const filteredLocations = locations.filter(function (loc) {
            return loc.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });
    test('selecting suggestion changes state of query', function () {
        CitySearchWrapper.setState({query: 'Lon'});
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });
    test('selecting all changes query to all', function () {
        CitySearchWrapper.setState({query: 'Du'});
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
        CitySearchWrapper.find('.allLine').simulate('click');
        expect(CitySearchWrapper.state('query')).toBe('all');
    });
    test('selecting CitySearch input reveals suggestion list', function () {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('shewSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({display: 'none'});
    });
    test('selecting suggestion hides suggestion list', function () {
        CitySearchWrapper.setState({
            query: 'Du',
            shewSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('shewSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({display: 'none'});
    });
});