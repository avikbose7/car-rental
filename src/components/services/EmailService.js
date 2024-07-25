import axios from 'axios';

const API_URL = 'http://localhost:8081/api/email/send';

export const sendEmail = (emailRequest) => {
    return axios.post(API_URL, emailRequest);
};
