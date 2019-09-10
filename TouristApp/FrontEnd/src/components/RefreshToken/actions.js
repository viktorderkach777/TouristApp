import RefreshService from './refreshService'
import {userReducer} from '../../reducers/auth';

export const refreshStarted = () =>({ type: 'REFRESH_STARTED' });
export const refreshSuccess = () => ({type: 'REFRESH_SUCCESS'});
export const refreshFailed = () => ({type: 'REFRESH_FAILED'});

export const refreshToken = (dispatch) => {
    dispatch(refreshStarted())
    return RefreshService.RefreshToken()
        .then((user) => {
            dispatch(refreshSuccess())
            dispatch(userReducer.actions.setCurrentUser(user))
        })
        .catch(() => {
            dispatch(refreshFailed());
        })
}
