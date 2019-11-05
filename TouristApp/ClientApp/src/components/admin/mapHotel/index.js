import React, { Suspense, lazy } from 'react';
import WeatherService from '../../weather/services/weatherService';
import { WeatherServiceProvider } from '../../weather/components/weatherServiceContext';
//import HotelMarkerMap from './components/hotelMarkerMap';
import MapService from '../../map/services/mapService';
import { MapServiceProvider } from '../../map/components/mapServiceContext';
import HotelDashboard from './components/hotelDashboard';

const ErrorBoundry = lazy(() => import('../../errorBoundry'));
const weatherService = new WeatherService();
const mapService = new MapService();

export default function MapHotel() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundry>
                <MapServiceProvider value={mapService}>
                    <WeatherServiceProvider value={weatherService}>
                        {/* <HotelMarkerMap /> */}
                        <HotelDashboard/>
                    </WeatherServiceProvider>
                </MapServiceProvider>
            </ErrorBoundry>
        </Suspense>
    );
}