import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-app-project-13b31-default-rtdb.firebaseio.com/"
});

export default instance;