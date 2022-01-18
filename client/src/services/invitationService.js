import axios from 'axios';
import {backendUrl} from "../config";

export default axios.create({
    baseURL: backendUrl + '/api/tokens',
    withCredentials: true
});