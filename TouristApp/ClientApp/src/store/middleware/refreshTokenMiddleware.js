import jwt from 'jsonwebtoken';
import {refreshToken} from '../../components/RefreshToken/actions';

export default function refreshTokenMiddleware(){
    return ({ dispatch, getState }) => next => (action) => {
        
        if (typeof action === 'function') {
            const token = jwt.decode(localStorage.getItem('jwtToken'))
            const refreshThreshold = (Math.round(Date.now() / 1000));
            if (token && refreshThreshold > token.exp) {
                refreshToken(dispatch).then(() => {
                    return next(action)
                }, (err)=> { return next(action); });
            }
            else{
                return next(action);
            }
        }
        else{
            return next(action);
        }
        
    }
}