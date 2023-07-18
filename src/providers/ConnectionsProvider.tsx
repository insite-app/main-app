import api from 'src/utils/api';

export async function sendRequest(senderId: string, receiverId: string) {
  try {
    const response = await api.post(`/connections/requests/create/${senderId}/${receiverId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Connection failed');
  }
}

export async function acceptRequest(requestId: string) {
  console.log('requestId', requestId);
  try {
    await api.post(`/connections/requests/${requestId}/accept`);
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function rejectRequest(requestId: string) {
  try {
    await api.post(`/connections/requests/${requestId}/reject`);
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function getRequestId(senderId: string, receiverId: string) {
  try {
    console.log('senderId', senderId);
    console.log('receiverId', receiverId);
    const response = await api.get(`/connections/requests/requestId/${senderId}/${receiverId}`);
    console.log(response.data);
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

export async function loadAllConnections(userId: string) {
  try {
    const response = await api.get(`/connections/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function checkIfConnectionExists(user1Id: string, user2Id: string) {
  try {
    const response = await api.get(`/connections/exists/${user1Id}/${user2Id}`);
    return response.data;
  } catch (error) {
    throw new Error('Connection failed');
  }
}

export async function removeConnection(user1Id: string, user2Id: string) {
  try {
    await api.post(`/connections/delete/${user1Id}/${user2Id}`);
  } catch (error) {
    throw new Error('Connection failed');
  }
}
