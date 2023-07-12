import api from 'src/utils/api';

export async function register(user: unknown) {
  try {
    const response = await api.post('/auth/register', user);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error('Username already taken');
    }
    throw new Error('Registration failed');
  }
}

export async function login(username: string, password: string) {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  const response = await api.post('/auth/login', { username, password });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return response.data;
}

export async function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function getCurrentUser() {
  return await api.get('/auth/user');
}
