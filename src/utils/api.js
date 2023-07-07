import axios from 'axios';
import { getBffHost } from '../config/getConfig';

const api = axios.create({
  baseURL: getBffHost(),
});

export default api;