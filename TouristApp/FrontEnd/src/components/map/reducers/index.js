const initialState = {
    hotels: {},
    markersLayerLoading: true,
    markersLayerError: null,  

};

export const mapReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_MARKERS_LAYER_REQUEST':
            return {
                ...state,
                hotels: {},
                markersLayerLoading: true,
                markersLayerError: null
            };
        case 'FETCH_MARKERS_LAYER_SUCCESS':
            // const {
            //     features
            // } = action.payload;
            console.log("redux", action)
            return {
                ...state,
                hotels: action.payload,
                markersLayerLoading: false,
                markersLayerError: null
            };
        case 'FETCH_MARKERS_LAYER_FAILURE':
            return {
                ...state,
                hotels: {},
                markersLayerLoading: false,
                markersLayerError: action.payload
            };        
        default:
            return state;
    }
};
