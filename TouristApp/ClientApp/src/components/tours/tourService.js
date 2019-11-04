import axios from 'axios';
import { serverUrl } from '../../config';

export default class TourService {

  static getListTours(model) {
    console.log('---STEP3----', model);
    return axios.get(`${serverUrl}api/tour/list/` + model.currentPage + "?sortOrder=" + model.sortOrder);
  }

  static postListTours(model) {
    console.log('---post list tour----', model);
    return axios.post(`${serverUrl}api/tour/list`, model);
  }


  static deleteTour(id) {
    return axios.delete(`${serverUrl}api/tour/` + id);
  }


}
