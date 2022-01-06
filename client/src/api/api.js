import axios from 'axios';
import BaseUrl from './baseUrl';

// const url = "http://xerographics.test"

//create base url for your server
export default axios.create({
    baseURL: BaseUrl,
})

