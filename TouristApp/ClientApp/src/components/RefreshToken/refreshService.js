    
//import BaseService from '../../Services/Base/BaseService';
import axios from "axios";
import {serverUrl} from '../../config';

export default class RefreshService {
    
    // static RefreshToken = async () => {
    //     const token = localStorage.getItem('refreshToken')
    //     var tokens = await BaseService.PostResourse(`account/refresh/${token}`)
    //     return BaseService.SetTokensGetUser(tokens)
    // }
    static RefreshToken = () => {
        const token = localStorage.getItem('refreshToken');
        return axios.post(`${serverUrl}api/account/refresh/${token}`);
    }
}