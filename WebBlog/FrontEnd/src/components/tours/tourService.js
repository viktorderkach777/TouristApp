import axios from 'axios';
import {serverUrl} from '../../config';

export default class TourService {

    static getListTours() {
        return axios.get(`${serverUrl}api/Hotel/list`);
    }
    
    //   static createNewAnimal (model) {
    //     return axios.post ('https://localhost:44320/api/animal/create', model);
    //   }

    //   static addLikeAnimal (id) {
    //     return axios.put ('https://localhost:44320/api/animal/addlike/'+id);
    //   }

    //   static deleteAnimal (id) {
    //     return axios.delete ('https://localhost:44320/api/animal/delete/'+id);
    //   }

    //   static createNewGirl (model) {
    //     return axios.post ('https://localhost:44320/api/animal/add-base64', model);
    //   }

}
