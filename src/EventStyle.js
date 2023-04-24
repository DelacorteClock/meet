import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

const EventStyle = function ({events}) {
    const [datums, setDatums] = useState([]);
    const getDatums = () => {
        const styles = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const keyDatums = styles.map(function (style) {
            const value = events.filter(function (event) {return event.summary.split(' ').includes(style);}).length;
            return {name: style, value: value};
        });
        return keyDatums;
    };
    useEffect(() => {
        setDatums(() => {getDatums();});
    }, [events]);
    return (
        <ResponsiveContainer height={350}>
            <PieChart width={300} height={350}>
                <Pie data={datums} cx={200} cy={200} labelLine={false} outerRadius={80} fill='#000000' dataKey='value' label={function ({name, percent}) {return `${name} ${(percent * 100).toFixed(0)}%`;}} ></Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventStyle;