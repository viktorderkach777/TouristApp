import axios from 'axios';
import { serverUrl } from '../../config';


export default class AdminService {


    static createNewRegion (model) {
        return axios.post (`${serverUrl}api/Hotel/regions/create`, model);
    }



//-----------------OPERATION    COUTRIES---------------------------

    static getCounties () {
        return axios.get(`${serverUrl}api/country/countries`);
    }

    static deleteCounty (id) {
        return  axios.delete (`${serverUrl}api/country/`+id);
        
    }

}


