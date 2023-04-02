import React from 'react';
import {shallow} from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import {fakeData} from '../fake-data';

/***
 * For any event... 
 * 'summary' is the title, 
 * 'start.dateTime' is date/time, 
 * 'start.timeZone' is time zone,
 * 'location' is location,
 * 'htmlLink' is link and
 * 'description' is description 
 * ***/

describe('<Event /> component', function () {
    var EventWrapper;
    var ind = 2; //Sample index (to not do every one which would take long)
    //Event wrapper with prop which is one 'fake' or sample event to use
    beforeAll(function () {
        EventWrapper = shallow(<Event event={fakeData[ind]} />);
    });
    //Rendering of basic info
    test('render time info paragraph', function () {
        expect(EventWrapper.find('.timeInfo')).toHaveLength(1);
    });
    test('render correct event', function () {
        //Want rendered title to match 'summary' of event from fakeData
        expect(EventWrapper.find('.eventTitle').text()).toBe(fakeData[ind].summary);
    });
    test('render correct date and time', function () {
        //Want rendered date and time to match 'start.dateTime' of event from fakeData
        expect(EventWrapper.find('.dateAndTime').text()).toBe(fakeData[ind].start.dateTime);
    });
    test('render correct time zone', function () {
        //Want rendered date and time to match 'start.timeZone' of event from fakeData
        expect(EventWrapper.find('.timeZone').text()).toBe(fakeData[ind].start.timeZone);
    });
    test('render correct time zone', function () {
        //Want rendered date and time to match 'start.timeZone' of event from fakeData
        expect(EventWrapper.find('.locationInfo').text()).toBe(fakeData[ind].location);
    });
    test('render toggler button with default notification to expand', function () {
        expect(EventWrapper.find('.toggler').text()).toBe('Expand Extra Details');
    });
    //Displaying correct button text
    test('clicking expand button changes button text to collapse text', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        expect(EventWrapper.find('.toggler').text()).toBe('Collapse Extra Details');
    });
    test('clicking collapse button changes button text to expand text', function () {
        //Start with expanded
        EventWrapper.setState({exp: true});
        EventWrapper.find('.toggler').simulate('click');
        expect(EventWrapper.find('.toggler').text()).toBe('Expand Extra Details');
    });
    //Revealing and hiding extra details (container, heading, link and description)
    test('clicking expand button reveals container', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        //Need one container
        expect(EventWrapper.find('.extraDetails')).toHaveLength(1);
    });
    test('clicking expand button reveals heading', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        //Need one heading
        expect(EventWrapper.find('.extraHead').text()).toBe('More Info');
    });
    test('clicking expand button reveals link', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        //Need one functioning link with correct href
        expect(EventWrapper.find('.extraLink').props().href).toBe(fakeData[ind].htmlLink);
    });
    test('clicking expand button reveals link', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        //Need link to say what it does
        expect(EventWrapper.find('.extraLink').text()).toBe('View Info On Google Calendar');
    });
    test('clicking expand button reveals description', function () {
        //Start with collapsed
        EventWrapper.setState({exp: false});
        EventWrapper.find('.toggler').simulate('click');
        //Need one link and it to say
        expect(EventWrapper.find('.extraParagraph').text()).toBe(fakeData[ind].description);
    });
    test('clicking collapse button hides container', function () {
        //Start with expanded
        EventWrapper.setState({exp: true});
        EventWrapper.find('.toggler').simulate('click');
        //Need no container
        expect(EventWrapper.find('.extraDetails')).toHaveLength(0);
    });
});