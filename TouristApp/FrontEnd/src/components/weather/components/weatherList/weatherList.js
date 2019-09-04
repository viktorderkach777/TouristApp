import React from 'react';
//import WeatherListItem from '../weather-list-item';

const WeatherListItem = React.lazy(() => import('../weatherListItem'));

const  WeatherList = ({ tiles, clickTile }) => {
    return (
        <>
            {
                tiles.map((tile, index) => {
                    return (
                        <WeatherListItem key={index} tile={tile} onClick={()=>{clickTile(tile.day)}}/>
                    )
                })
            }
        </>
    );
};

export default WeatherList;