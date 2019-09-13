import axios from 'axios';
import { serverUrl } from '../../config';


export default class AdminService {


    static createNewRegion (model) {
        return axios.post (`${serverUrl}api/Hotel/regions/create`, model);
    }



//-----------------OPERATION    COUTRIES---------------------------

    static getCountries () {
        return axios.get(`${serverUrl}api/country/countries`);
    }

    static deleteCountry (id) {
        return  axios.delete (`${serverUrl}api/country/`+id);
        
    }

    static editCountry (id,model) {
        return  axios.put (`${serverUrl}api/country/`+id,model);
    }

    static addCountry (model) {
        return  axios.post(`${serverUrl}api/country/create`, model )
    }
  
}


