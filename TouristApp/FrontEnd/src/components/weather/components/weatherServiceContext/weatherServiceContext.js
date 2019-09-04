import React from 'react';

const{
    Provider: WeatherServiceProvider,
    Consumer: WeatherServiceConsumer
} = React.createContext();

export{
    WeatherServiceProvider,
    WeatherServiceConsumer
};