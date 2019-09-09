import axios from 'axios';
import { serverUrl } from '../../config';


export default class AdminService {


    static createNewRegion (model) {
        return axios.post (`${serverUrl}api/Hotel/regions/create`, model);
    }


}