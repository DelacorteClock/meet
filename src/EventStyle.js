import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

const EventStyle = function ({events}) {
    const [datums, setDatums] = useState([]);
    const colours = ['#00985F', '#CE8E00', '#006EC7', '#C60C30', '#6E267B'];
    const getDatums = () => {
        const styles = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const keyDatums = styles.map(function (style) {
            const value = events.filter(function (event) {return event.summary.split(' ').includes(style);}).length;
            return {name: style, value: value};
        });
        console.log(keyDatums);
        return keyDatums;
    };
    useEffect(() => {
        setDatums(() => {getDatums();});
    }, [events]);
    return ( 
        <ResponsiveContainer height={350}>
            <PieChart>
                <Pie data={getDatums()} cx={200} cy={200} labelLine={false} outerRadius={80} dataKey='value' label={function ({name, percent}) {if (percent) {return `${name} ${(percent * 100).toFixed(0)}%`;}}}>
                    <Cell key={`cell-0`} fill={colours[0]} />
                    <Cell key={`cell-1`} fill={colours[1]} />
                    <Cell key={`cell-2`} fill={colours[2]} />
                    <Cell key={`cell-3`} fill={colours[3]} />
                    <Cell key={`cell-4`} fill={colours[4]} />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventStyle;