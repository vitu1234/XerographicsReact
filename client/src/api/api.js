import axios from 'axios';
import BaseUrl from './baseUrl';

// const url = "http://xerographics.test"
const defaultOptions = {
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('jwt_token')

    },
};

//create base url for your server
export default axios.create(defaultOptions)

