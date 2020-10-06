import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3077a.firebaseio.com/',

});

export default instance;