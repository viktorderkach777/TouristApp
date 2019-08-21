import axios from "axios";
import {serverUrl} from '../../config';

export default class CaptchaService {
    static postNewKey() {
        return axios.post(`${serverUrl}api/CaptchaImage/post-guid-captcha`)
    };
}