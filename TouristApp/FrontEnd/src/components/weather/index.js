import React, { Suspense, lazy } from 'react';
import WeatherService from './services/weatherService';
import { WeatherServiceProvider } from './components/weatherServiceContext';

//import App from './components/app';
//import ErrorBoundry from './components/error-boundry';

const WeatherDashboard = lazy(() => import('./components/weatherDashBoard'));
const ErrorBoundry = lazy(() => import('../../components/errorBoundry'));

const weatherService = new WeatherService();

export default function Wheather() {
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <ErrorBoundry>
                <WeatherServiceProvider value={weatherService}>
                    <WeatherDashboard />
                </WeatherServiceProvider>               
            </ErrorBoundry>
        </Suspense>
    )
};
