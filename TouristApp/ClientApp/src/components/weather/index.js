import React, { Suspense, lazy } from 'react';
import WeatherService from './services/weatherService';
//import FakeService from './services/fakeService';
import { WeatherServiceProvider } from './components/weatherServiceContext';
import MapService from '../map/services/mapService';
//import FakeService from './services/fakeService';
import { MapServiceProvider } from '../map/components/mapServiceContext';
const WeatherDashboard = lazy(() => import('./components/weatherDashBoard'));
const ErrorBoundry = lazy(() => import('../../components/errorBoundry'));

const weatherService = new WeatherService();
const mapService = new MapService();

export default function Wheather(props) {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundry>
                <MapServiceProvider value={mapService}>
                    <WeatherServiceProvider value={weatherService}>
                        <WeatherDashboard />
                    </WeatherServiceProvider>
                </MapServiceProvider>
            </ErrorBoundry>
        </Suspense>
    )
};
