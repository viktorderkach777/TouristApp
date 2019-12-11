import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update'
import TourService from "../components/tours/tourService";
import * as FilterReducer from "../reducers/filterReducer";
import { push } from 'connected-react-router';
export const initialState = {
  list: {
    data: [],
    error: false,
    success: false,
    loading: false,
    totalPages: null,
    currentPage: 1,
    sortOrder: 'name',
    countItem:0,
    searchText: '',
    filters: []
  },
  deleting: {
    error: false,
    loading: false,
    success: false
  },
  creating: {
    error: false,
    loading: false,
    success: false
  }

};


export const tours = createSlice({
  slice: 'tours',
  initialState: initialState,
  reducers: {
     //------------------POST LIST TOUR --------------------------------------
    postToursStarted: state => {
      let newState = state;
      newState = update.set(state, 'list.loading', true);
      newState = update.set(newState, 'list.success', false);
      return newState;
    },
    postToursSuccess: (state, action) => {
      let newState = state;
      const data = action.payload.data;
      //console.log("post list", data);
      newState = update.set(state, 'list.loading', false);
      newState = update.set(newState, 'list.success', true);
      newState = update.set(newState, 'list.data', data.tours);
      newState = update.set(newState, 'list.totalPages', data.totalPages);
      newState = update.set(newState, 'list.countItem', data.countItem);
      newState = update.set(newState, 'list.currentPage', data.currentPage);
      //newState = update.set(newState, 'list.sortOrder', data.sortOrder);
      //newState = update.set(newState, 'list.searchText', '');
      return newState;
    },
    postToursFailed: state => {
      let newState = state;
      newState = update.set(state, 'list.loading', false);
      newState = update.set(newState, 'list.error', true);
      return newState;
    },
    //------------------DELETE TOUR --------------------------------------
    deleteTourStarted: state => {
      let newState = state;
      newState = update.set(state, 'deleting.loading', true);
      newState = update.set(newState, 'deleting.success', false);
      return newState;
    },
    deleteTourSuccess: (state, action) => {
      let newState = state;
      let data = state.list.data.filter(item => item.id !== action.payload);
      newState = update.set(state, 'deleting.loading', false);
      newState = update.set(newState, 'deleting.success', true);
      newState = update.set(newState, 'list.data', data);
      return newState;
    },
    deleteTourFailed: state => {
      let newState = state;
      newState = update.set(state, 'deleting.loading', false);
      newState = update.set(newState, 'deleting.error', true);
      return newState;
    },
    //------------------SET TypeSort --------------------------------------
    setTypeSort: (state, action) => {
      let newState = state;
      const typeSort = action.payload;
      //console.log('--typeSort--', typeSort);
      newState = update.set(state, 'list.sortOrder', typeSort);
      newState = update.set(newState, 'list.currentPage', 1);
      return newState;
    },
    //------------------SET SearchText --------------------------------------
    setSearchText: (state, action) => {
      let newState = state;
      const SearchText = action.payload;
      //console.log('--SearchText--', SearchText);
      newState = update.set(state, 'list.searchText', SearchText);
      newState = update.set(newState, 'list.currentPage', 1);
      return newState;
    },
    //------------------SET CurrentPage --------------------------------------
    setCurrentPage: (state, action) => {
      let newState = state;
      const CurrentPage = action.payload;
      //console.log('--CurrentPage--', CurrentPage);
      newState = update.set(state, 'list.currentPage', CurrentPage);
      return newState;
    },
    //------------------SET CURRENT FILTERID -----------------------------------
    setFilterId: (state, action) => {
      let newState = state;
      const filterId = action.payload;
      let beginSize = state.list.filters.length;
      let filters = state.list.filters.filter(item => item !== filterId);
      if  (beginSize===filters.length)  filters = filters.concat(filterId);
      newState = update.set(state, 'list.filters', filters);
      newState = update.set(newState, 'list.currentPage', 1);
      return newState;
    }
  }
});

export const postListTours = (model) => {
  return (dispatch) => {
    dispatch(tours.actions.postToursStarted());

    TourService.postListTours(model)
      .then((response) => {
        //console.log('--success create--', response.data);
        dispatch(tours.actions.postToursSuccess(response));
      })
      .catch(() => {
        //console.log('--failed--');
        dispatch(tours.actions.postToursFailed());
      });
  }
};

export const deleteTour = (tourId) => {
  return (dispatch) => {
    dispatch(tours.actions.deleteTourStarted());

    TourService.deleteTour(tourId)
      .then((response) => {
        //console.log('--success delete--', response.data);
        var tourId = response.data;
        dispatch(tours.actions.deleteTourSuccess(tourId));
      })
      .catch(() => {
        //console.log('--failed--');
        dispatch(tours.actions.deleteTourFailed());
      });
  }
}

export const setTypeSort = (TypeSort) => {
  return (dispatch) => {
    dispatch(tours.actions.setTypeSort(TypeSort));
  }
}

export const setSearchText = (SearchText) => {
  return (dispatch) => {
    dispatch(tours.actions.setSearchText(SearchText));
  }
}

export const setCurrentPage = (currentPage) => {
  return (dispatch) => {
    dispatch(tours.actions.setCurrentPage(currentPage));
  }
}

export const setFilterId = (filterId) => {
  return (dispatch) => {
      
      dispatch(FilterReducer.setChekedFilters(filterId));
      
      const country = 'all?country_id%5B%5D=1&country_id%5B%5D=2&country_id%5B%5D=3&nights_from=6&nights_to=8&min_price=&max_price=&date_from=&date_to=&order=3';
      dispatch(push(`/tours/${country}`));
      

    return dispatch(tours.actions.setFilterId(filterId));
  }
}

