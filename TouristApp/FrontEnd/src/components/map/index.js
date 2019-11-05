import React, { Suspense, lazy } from 'react';
import MapService from './services/mapService';
//import FakeService from './services/fakeService';
import { MapServiceProvider } from './components/mapServiceContext';
const MarkersLayer = lazy(() => import('./components/markersLayer'));
const ErrorBoundry = lazy(() => import('../../components/errorBoundry'));

const mapService = new MapService();
//const fakeService = new FakeService();

export default function MapMarker(props) {
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundry>
                <MapServiceProvider value={mapService}>
                    <MarkersLayer />
                </MapServiceProvider>               
            </ErrorBoundry>
        </Suspense>
    )
};