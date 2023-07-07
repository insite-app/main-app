import api from '../utils/api';

export async function fetchStudents() {
  const response = await api.get('/students');
  return response.data;
}