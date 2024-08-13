import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get(resource, params = {}) {
    return httpClient.get(resource, { params });
  },

  post(resource, data) {
    return httpClient.post(resource, data);
  },

  update(resource, data) {
    return httpClient.put(resource, data);
  },

  delete(resource) {
    console.log(httpClient)
    return httpClient.delete(resource);
  }
};
