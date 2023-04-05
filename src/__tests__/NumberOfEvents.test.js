import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents.js';

describe('<NumberOfEvents /> component', function () {
    var NumberOfEventsWrapper;
    beforeAll(function () {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={function () {}} />);
    });
    test('render quantity box', function () {
        expect(NumberOfEventsWrapper.find('.quantity')).toHaveLength(1);
    });
    test('accept number quantities', function () {
        expect(NumberOfEventsWrapper.find('.quantity').props().type).toBe('number');
    });
    test('start at default quantity 25', function () {
        expect(NumberOfEventsWrapper.find('.quantity').props().value).toBe('25');
    });
    test('change of number changes quantity state', function () {
        //Change quantity to 57 in text box
        NumberOfEventsWrapper.find('.quantity').simulate('change', {target: {value: '57'}});
        expect(NumberOfEventsWrapper.state('quantity')).toBe('57');
    });
    test('change of number to non-number does not change quantity state', function () {
        NumberOfEventsWrapper.setState({quantity: '20'});
        //Change quantity to VeryFakeText in text box
        NumberOfEventsWrapper.find('.quantity').simulate('change', {target: {value: 'VeryFakeText'}});
        expect(NumberOfEventsWrapper.state('quantity')).toBe('20');
    });
});
