import api from 'src/utils/api';

export async function sendRequest(senderId: string, receiverUsername: string) {
  try {
    const response = await api.post(`/connections/requests/${senderId}/${receiverUsername}`);
    return response.data;
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function checkIfRequestExists(senderId: string, receiverUsername: string) {
  try {
    const response = await api.get(`/connections/requests/${senderId}/${receiverUsername}/exists`);
    return response.data;
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function loadAllRequests(userId: string) {
  try {
    const response = await api.get(`/connections/requests/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Connection failed');
  }
}
