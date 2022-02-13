import axios from 'axios';
import BaseUrlApi from './baseUrlApi';

// const url = "http://xerographics.test"
const defaultOptions = {
    baseURL: BaseUrlApi,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('jwt_token')

    },
};

//create base url for your server
export default axios.create(defaultOptions)

