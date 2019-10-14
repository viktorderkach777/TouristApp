import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update'
import TourService from "../components/tours/tourService";

export const initialState = {
  list: {
    data: [],
    error: false,
    success: false,
    loading: false,
    totalPages: null,
    currentPage: '1',
    sortOrder:'name'
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

    getToursStarted: state => {
      let newState = state;
      newState = update.set(state, 'list.loading', true);
      newState = update.set(newState, 'list.success', false);
      return newState;
    },
    getToursSuccess: (state, action) => {
      let newState = state;
      const data = action.payload.data;
      console.log("get list", data);
      newState = update.set(state, 'list.loading', false);
      newState = update.set(newState, 'list.success', true);
      newState = update.set(newState, 'list.data', data.tours);
      newState = update.set(newState, 'list.totalPages', data.totalPages);
      newState = update.set(newState, 'list.currentPage', data.currentPage);
      return newState;
    },
    getToursFailed: state => {
      let newState = state;
      newState = update.set(state, 'list.loading', false);
      newState = update.set(newState, 'list.error', true);
      return newState;
    },


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
  console.log("get list", data);
  newState = update.set(state, 'list.loading', false);
  newState = update.set(newState, 'list.success', true);
  newState = update.set(newState, 'list.data', data.tours);
  newState = update.set(newState, 'list.totalPages', data.totalPages);
  newState = update.set(newState, 'list.currentPage', data.currentPage);
  newState = update.set(newState, 'list.sortOrder', data.sortOrder);
  return newState;
},
postToursFailed: state => {
  let newState = state;
  newState = update.set(state, 'list.loading', false);
  newState = update.set(newState, 'list.error', true);
  return newState;
},


//------------------DELETE TOUR --------------------------------------

    deleteTourStarted:state => {
      let newState = state;
      newState = update.set(state, 'deleting.loading', true);
      newState = update.set(newState, 'deleting.success', false);
      return newState;
    }, 
    deleteTourSuccess: (state, action) =>  {
      let newState = state;
      let data = state.list.data.filter(item => item.id !== action.payload);
      newState = update.set(state, 'deleting.loading', false);
      newState = update.set(newState, 'deleting.success', true);
      newState = update.set(newState, 'list.data', data);
      return newState;
    }, 
    deleteTourFailed:state => {
      let newState = state;
      newState = update.set(state, 'deleting.loading', false);
      newState = update.set(newState, 'deleting.error', true);
      return newState;
    }, 

//------------------SET TypeSort --------------------------------------
      setTypeSort: (state, action) => {
        let newState = state;
        const typeSort = action.payload;
        console.log('--typeSort--', typeSort);
        newState = update.set(state, 'list.sortOrder', typeSort);
        return newState;
      } 






  }
});

export const getListTours = (model) => {
  return (dispatch) => {
    dispatch(tours.actions.getToursStarted());

    TourService.getListTours(model)
      .then((response) => {
        console.log('--success create--', response.data);
        dispatch(tours.actions.getToursSuccess(response));
      })
      .catch(() => {
        console.log('--failed--');
        dispatch(tours.actions.getToursFailed());
      });
  }
};

export const postListTours = (model) => {
  return (dispatch) => {
    dispatch(tours.actions.postToursStarted());

    TourService.postListTours(model)
      .then((response) => {
        console.log('--success create--', response.data);
        dispatch(tours.actions.postToursSuccess(response));
      })
      .catch(() => {
        console.log('--failed--');
        dispatch(tours.actions.postToursFailed());
      });
  }
};




export const deleteTour = (tourId) => {
  return (dispatch) => {
      dispatch(tours.actions.deleteTourStarted());
      
      TourService.deleteTour(tourId)
          .then((response) => {
              console.log('--success delete--', response.data);
              var tourId = response.data;
              dispatch(tours.actions.deleteTourSuccess(tourId));
          })
          .catch(() => {
              console.log('--failed--');
              dispatch(tours.actions.deleteTourFailed());
          });
  }
}

export const setTypeSort = (TypeSort) => {
  return (dispatch) => {
      dispatch(tours.actions.setTypeSort(TypeSort));
  }
}

