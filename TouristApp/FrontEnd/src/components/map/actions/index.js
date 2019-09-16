const markersLayerRequested = () => {
    return {
        type: 'FETCH_MARKERS_LAYER_REQUEST'
    };
};

const markersLayerLoaded = (data) => {
    return {
        type: 'FETCH_MARKERS_LAYER_SUCCESS',
        payload: data
    };
};

const markersLayerError = (error) => {
    return {
        type: 'FETCH_MARKERS_LAYER_FAILURE',
        payload: error
    };
};


export {
    markersLayerLoaded, markersLayerError, markersLayerRequested   
};