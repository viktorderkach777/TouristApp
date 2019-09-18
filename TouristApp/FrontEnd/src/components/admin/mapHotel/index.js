import React, {Component, Suspense, lazy } from 'react';
import WeatherService from '../../weather/services/weatherService';
import { WeatherServiceProvider } from '../../weather/components/weatherServiceContext';
import HotelMarkerMap from './components/hotelMarkerMap';

const ErrorBoundry = lazy(() => import('../../errorBoundry'));
const weatherService = new WeatherService();

class MapHotel extends Component {
    state = {  }
    render() { 
        return ( 
            <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundry>
                <WeatherServiceProvider value={weatherService}>
                <HotelMarkerMap/>
                </WeatherServiceProvider>               
            </ErrorBoundry>
        </Suspense>
         );
    }
}
 
export default MapHotel;