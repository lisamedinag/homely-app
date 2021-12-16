import axios from 'axios';
import {backendUrl} from "../config";

export default axios.create({
    baseURL: backendUrl + '/api/tasks',
    withCredentials: true
});
