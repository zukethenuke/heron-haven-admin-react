import Axios from 'axios';

export default () => {
    let baseURL = 'https://heron-haven-api.herokuapp.com';
    return Axios.create({baseURL})
}