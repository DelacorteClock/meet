import React from 'react';
import {shallow} from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import {fakeData} from '../fake-data';

describe('<EventList /> component', function () {
    test('render correct event number', function () {
        const EventListWrapper = shallow(<EventList events={fakeData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(fakeData.length);
    });
});