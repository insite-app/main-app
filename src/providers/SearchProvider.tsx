import api from 'src/utils/api';

export async function search(query: string, page = 1, limit = 5) {
  // Replace with your API endpoint
  const url = `/search?q=${query}&page=${page}&limit=${limit}`;

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
}
