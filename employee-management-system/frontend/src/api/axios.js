import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // your Spring Boot backend base URL
});

export default instance;
