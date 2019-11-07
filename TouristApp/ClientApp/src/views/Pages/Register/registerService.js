import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoginService {
    static register(model) {
        return axios.post(`${serverUrl}api/account/register`,model);
    };    
}