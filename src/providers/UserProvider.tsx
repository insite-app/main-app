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
      } else if (
        error.response.status === 400 &&
        error.response.data.message === 'Bio field contains too many lines'
      ) {
        throw new Error('Bio field contains too many lines');
      }
    }
    throw error;
  }
}

export async function getAvatarUrl(username: string) {
  try {
    const response = await api.get(`/users/${username}/avatar`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
}

export async function uploadAvatar(username: string, file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');

    const response = await api.post(`/users/${username}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("You aren't authorized to update this user");
      } else if (error.response.status === 404) {
        throw new Error('User not found');
      }
    }
    throw error;
  }
}
