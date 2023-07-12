import api from '../utils/api';

export async function fetchUsers() {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('You are unauthorized to view this page.');
    }
    throw error;
  }
}

export async function getProfile(username: string) {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
}

export async function saveProfile(username: string, profile: unknown) {
  try {
    const response = await api.put(`/users/${username}`, profile);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('User not found');
      } else if (error.response.status === 409) {
        throw new Error('Email already taken');
      }
    }
    throw error;
  }
}
