import axios from 'axios';


const grafisApi = axios.create({
    baseURL: '/api'



})


export default grafisApi;