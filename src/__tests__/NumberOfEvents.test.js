import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', function () {
    var NumberOfEventsWrapper;
    beforeAll(function () {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });
    test('render quantity box', function () {
        expect(NumberOfEventsWrapper.find('.quantity')).toHaveLength(1);
    });
    test('accept number quantities', function () {
        expect(NumberOfEventsWrapper.find('.quantity').props().type).toBe('number');
    });
    test('start at default quantity 32...for some reason', function () {
        expect(NumberOfEventsWrapper.find('.quantity').props().value).toBe('32');
    });
    test('change of number changes quantity state', function () {
        //Change quantity to 57 in text box
        NumberOfEventsWrapper.find('.quantity').simulate('change', {target: {value: '57'}});
        expect(NumberOfEventsWrapper.state('quantity')).toBe('57');
    });
    test('change of number to non-number does not change quantity state', function () {
        NumberOfEventsWrapper.setState({quantity: '25'});
        //Change quantity to FakeText in text box
        NumberOfEventsWrapper.find('.quantity').simulate('change', {target: {value: 'FakeText'}});
        expect(NumberOfEventsWrapper.state('quantity')).toBe('25');
    });
});