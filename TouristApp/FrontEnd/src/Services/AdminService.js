import axios from 'axios';
import { serverUrl } from '../config';


export default class AdminService {

    //-----------------OPERATION  HOTELS---------------------------

    static addHotel(model) {
        return axios.post(`${serverUrl}api/hotel/create`, model)
    }
    static addPhotoHotel(model) {
        return axios.post(`${serverUrl}api/hotel/photo`, model)
    }

    static getHotels(id) {
        return axios.get(`${serverUrl}api/hotel/` + id);
    }

    //-----------------OPERATION  TOURS---------------------------

    static addTour(model) {
        return axios.post(`${serverUrl}api/tour/create`, model)
    }

    //-----------------OPERATION    COUTRIES---------------------------

    static getCountries() {
        return axios.get(`${serverUrl}api/country/countries`);
    }

    static deleteCountry(id) {
        return axios.delete(`${serverUrl}api/country/` + id);
    }

    static editCountry(id, model) {
        return axios.put(`${serverUrl}api/country/` + id, model);
    }

    static addCountry(model) {
        return axios.post(`${serverUrl}api/country/create`, model)
    }


    //-----------------OPERATION  REGION---------------------------

    static addRegion(model) {
        return axios.post(`${serverUrl}api/region/create`, model)
    }

    static getRegiones(id) {
        return axios.get(`${serverUrl}api/region/` + id);
    }

    static deleteRegion(id) {
        return axios.delete(`${serverUrl}api/region/` + id);
    }

    static editRegion(id, model) {
        return axios.put(`${serverUrl}api/region/` + id, model);
    }

    static createNewRegion(model) {
        return axios.post(`${serverUrl}api/Hotel/regions/create`, model);
    }

    //-----------------OPERATION  PrivatBank---------------------------
    static getKurs(date) {
        return axios.get(`${serverUrl}api/SampleData/kurs/` + date);
    }


    //   static getKurs (date) {
    //     return axios.get('https://api.privatbank.ua/p24api/exchange_rates?json&date='+ date);
    //}

}


