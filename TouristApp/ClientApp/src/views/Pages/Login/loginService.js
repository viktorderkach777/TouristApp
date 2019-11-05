import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoginService {
    static login(model) {
        return axios.post(`${serverUrl}api/account/login`,model)
    };

    static facebook_enter(model) {
        return axios.post(`${serverUrl}api/facebookauth/facebook`,model)
    };

    static google_enter(model) {
        return axios.post(`${serverUrl}api/googleauth/google`,model)
    };
}