import axios from 'axios';
import jwt from 'jsonwebtoken';
import { serverUrl } from '../../config';
export default class BaseService {
    
    static _imageBase = 'http://localhost/images';

    static async GetResourse(url) {
        const res = await axios.get(`${serverUrl}api/${url}`);
        if (!res) {
            throw new Error(`Could not axios ${url}, received ${res.status}`)
        }
        return await res.data;
    }

    static async PostResourse(url, data) {
        return await axios.post(`${serverUrl}api/${url}`, data)
        .then(res => {
            if (!res) {
                throw new Error(`Could not axios ${url}, received ${res.status}`)
            }
            return res.data;
        });
        
    }

    static SetTokensGetUser = (tokens) => {
        localStorage.setItem('jwtToken', tokens.token);
        localStorage.setItem('refreshToken', tokens.refToken);
        if (tokens.jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        console.log("data login", tokens.token);
        const user=jwt.decode(tokens.token);
        console.log('-----user login------', user);
        return user
    }    
}