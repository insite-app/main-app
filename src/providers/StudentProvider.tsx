import api from '../utils/api';

export async function fetchStudents() {
  const response = await api.get('/students');
  return response.data;
}

export async function createStudent(student: unknown) {
  const response = await api.post('/students', student);
  return response.data;
}