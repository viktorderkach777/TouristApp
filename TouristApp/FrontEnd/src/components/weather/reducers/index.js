
const initialState = {
    tiles: [],
    tilesLoading: true,
    tilesError: null,
    cityName: null,
    country: null,
    cityDay: null,
    region: 'Kyiv'
};

export const weatherReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_TILES_REQUEST':
            return {
                ...state,
                tiles: [],
                tilesLoading: true,
                tilesError: null
            };
        case 'FETCH_TILES_SUCCESS':
            const {
                cityName,
                country,
                cityDay,
                tiles
            } = action.payload;
            return {
                ...state,
                cityName,
                country,
                cityDay,
                tiles,
                tilesLoading: false,
                tilesError: null
            };
        case 'FETCH_TILES_FAILURE':
            return {
                ...state,
                tiles: [],
                tilesLoading: false,
                tilesError: action.payload
            };
        case 'FETCH_CITY_DATA_BY_DAY_SUCCESS':
            return {
                ...state,
                cityDay: action.payload
            };
        case 'UPLOAD_REGION_SUCCESS':
            return {
                ...state,
                region: action.payload
            };
        default:
            return state;
    }
};

//export default reducer;