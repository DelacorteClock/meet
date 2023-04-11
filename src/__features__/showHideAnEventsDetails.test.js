import {loadFeature, defineFeature} from 'jest-cucumber';
import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/__features__/showHideAnEventsDetails.feature');

defineFeature(feature, function (test) {
    test('The default is that the event element is collapsed', function ({given, when, then}) {
        var AppWrapper;
        given('that the app got opened', function () {
            AppWrapper = mount(<App />);
        });
        when('an event did not get clicked by the user', function () {
            
        });
        then('the event will be collapsed', function () {
            AppWrapper.update();
            //Text saying to expand reveals that event is collapsed
            expect(AppWrapper.find('.toggler').at(13).text()).toBe('Expand Extra Details');
            AppWrapper.unmount();
        });
    });
    test('User can expand event to see details', function ({given, when, then}) {
        var AppWrapper;
        given('that the app got opened', function () {
            AppWrapper = mount(<App />);
        });
        when('an event gets expanded by the user', function () {
            AppWrapper.update();
            AppWrapper.find('.toggler').at(7).simulate('click');
        });
        then('the user would see event details', function () {
            //One thing with className extraDetails should be revealed
            expect(AppWrapper.find('.extraDetails')).toHaveLength(1);
            AppWrapper.unmount();
        });
    });
    test('User can collapse event to hide details', function ({given, when, then}) {
        var AppWrapper;
        AppWrapper = mount(<App />);
        given('that the user expanded an event', function () {
            AppWrapper.update();
            AppWrapper.find('.toggler').at(5).simulate('click');
        });
        when('the user collapses the event', function () {
            AppWrapper.find('.toggler').at(5).simulate('click');
        });
        then('the event details would get hidden', function () {
            //Nothing with className extraDetails should be revealed
            expect(AppWrapper.find('.extraDetails')).toHaveLength(0);
            AppWrapper.unmount();
        });
    });
});