import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8081/api/user/getall';
const DEL_USER_API = 'http://localhost:8081/api/user';

class UserService {

    getUser(){
        return axios.get(USERS_REST_API_URL);
    }
    deleteUser(userId) {
        return axios.delete(`${DEL_USER_API}/${userId}`);
    }
}

export default new UserService();