import axios from 'axios';
import { serverUrl } from '../../config';

export default class TourService {

  static getListFilters() {
    return axios.get(`${serverUrl}api/tour/filters`);
  }

  static postListTours(model) {
    //console.log('---post list tour----', model);
    return axios.post(`${serverUrl}api/tour/list2`, model);
  }

  static deleteTour(id) {
    return axios.delete(`${serverUrl}api/tour/` + id);
  }

  static likeTour(id) {
    return axios.post(`${serverUrl}api/tour/like` + id);
  }

}
