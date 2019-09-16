const markersLayerRequested = () => {
    return {
        type: 'FETCH_MARKERS_LAYER_REQUEST'
    };
};

const markersLayerLoading = (hotels) => {
    console.log("markersLayerLoading", hotels)
    return {
        type: 'FETCH_MARKERS_LAYER_SUCCESS',
        payload: hotels
    };
};

const markersLayerError = (error) => {
    return {
        type: 'FETCH_MARKERS_LAYER_FAILURE',
        payload: error
    };
};


export {
    markersLayerLoading, markersLayerError, markersLayerRequested   
};