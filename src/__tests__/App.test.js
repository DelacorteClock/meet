import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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