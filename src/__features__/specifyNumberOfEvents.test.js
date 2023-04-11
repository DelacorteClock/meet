import {loadFeature, defineFeature} from 'jest-cucumber';
import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents.js';

const feature = loadFeature('./src/__features__/specifyNumberOfEvents.feature');

defineFeature(feature, function (test) {
    test('When user didn\'t choose a number 25 is the default number', function ({given, when, then}) {
        var AppWrapper;
        given('that the app got opened', function () {
            AppWrapper = mount(<App />);
        });
        when('the user did not type a number of events', function () {
            AppWrapper.update();
        });
        then('there would be 25 events on the page', function () {
            expect(AppWrapper.find('.quantity').props().value).toBe('25');
        });
    });
    test('User can change number of events', ({given, when, then}) => {
        var AppWrapper;
        given('that the app got opened', function () {
            AppWrapper = mount(<App />);
        });
        when('the user types a new event number', function () {
            AppWrapper.update();
            AppWrapper.find('.quantity').simulate('change', {target: {value: '57'}});
        });
        then('the app would display that amount of events', function () {
            expect(AppWrapper.find(NumberOfEvents).state('quantity')).toBe('57');
        });
    });
});