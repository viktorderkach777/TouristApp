import React from 'react';
import { MapServiceConsumer } from '../mapServiceContext';

const withWeatherService = () => (Wrapped) => {
    return (props) => {
        return (
            <MapServiceConsumer>
                {
                    (mapService) => {
                        return (<Wrapped {...props}
                            mapService={mapService} />);
                    }
                }
            </MapServiceConsumer>
        );
    }
};

export default withWeatherService;