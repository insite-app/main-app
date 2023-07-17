import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { loadAllRequests } from 'src/providers/ConnectionsProvider';
import UserCard from '../users/UserCard';

interface Request {
  senderId: string;
  sender: any;
}

const RequestsComponent = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await loadAllRequests(currentUser.id);
        setRequests(result);
        console.log(requests);
      } catch (error) {
        console.error('Failed to load requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Requests</h2>
      {requests.length === 0 && <p>No requests at the moment.</p>}
      {requests.map((request, index) => (
        <p key={index}>
          <UserCard user={request.sender}></UserCard>
        </p>
      ))}
    </div>
  );
};

export default RequestsComponent;
