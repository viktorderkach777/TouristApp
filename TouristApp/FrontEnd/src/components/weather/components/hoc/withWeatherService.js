import React from 'react';
import { WeatherServiceConsumer } from '../weatherServiceContext';

const withWeatherService = () => (Wrapped) => {
    return (props) => {
        return (
            <WeatherServiceConsumer>
                {
                    (weatherService) => {
                        return (<Wrapped {...props}
                            weatherService={weatherService} />);
                    }
                }
            </WeatherServiceConsumer>
        );
    }
};

export default withWeatherService;