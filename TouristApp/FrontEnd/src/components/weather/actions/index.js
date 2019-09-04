const tilesRequested = () => {
    return {
        type: 'FETCH_TILES_REQUEST'
    };
};

const tilesLoaded = (tiles) => {
    return {
        type: 'FETCH_TILES_SUCCESS',
        payload: tiles
    };
};

const tilesError = (error) => {
    return {
        type: 'FETCH_TILES_FAILURE',
        payload: error
    };
};

const cityDataLoadedByDay = (cityDay) => {
    return {
        type: 'FETCH_CITY_DATA_BY_DAY_SUCCESS',
        payload: cityDay
    };
};

const cityDataLoaded = (data) => {
    return {
        type: 'FETCH_CITY_DATA_SUCCESS',
        payload: data
    };
};

const fetchTiles = (weatherService, dispatch) => () => {

    dispatch(tilesRequested());
    console.log("fetchTiles");
    weatherService.getTiles()
        .then((tiles) => { 
            console.log("tillles", tiles);           
            dispatch(tilesLoaded(tiles))
        })
        .catch((err) => dispatch(tilesError(err)));
}

export {
    fetchTiles,   
    cityDataLoadedByDay,
    cityDataLoaded   
};