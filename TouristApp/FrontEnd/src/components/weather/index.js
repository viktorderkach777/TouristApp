import React, { Suspense, lazy } from 'react';
import WeatherService from './services/weatherService';
//import FakeService from './services/fakeService';
import { WeatherServiceProvider } from './components/weatherServiceContext';
const WeatherDashboard = lazy(() => import('./components/weatherDashBoard'));
const ErrorBoundry = lazy(() => import('../../components/errorBoundry'));

const weatherService = new WeatherService();
//const fakeService = new FakeService();

export default function Wheather(props) {
    const region = 'Rivne';
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <ErrorBoundry>
                <WeatherServiceProvider value={weatherService}>
                    <WeatherDashboard region={region}/>
                </WeatherServiceProvider>               
            </ErrorBoundry>
        </Suspense>
    )
};
