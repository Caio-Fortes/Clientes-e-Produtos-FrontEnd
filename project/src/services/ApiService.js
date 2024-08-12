import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get(resource, params = {}) {
    return apiClient.get(resource, { params });
  }
};
