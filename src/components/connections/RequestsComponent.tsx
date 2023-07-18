import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { UserContext } from 'src/contexts/UserContext';
import { loadAllRequests } from 'src/providers/ConnectionsProvider';
import UserCard from '../users/UserCard';
import AcceptRequestButton from './AcceptRequestButton';
import RejectRequestButton from './RejectRequestButton';

interface Request {
  id: string;
  receiverId: string;
  senderId: string;
  sender: any;
  createdAt: string;
}

const RequestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

const UserCardOuterContainer = styled.div`
  margin-left: 30%;
  flex: 4;
`;

const ButtonContainer = styled.div`
  margin-right: 35%;
  flex: 1;
`;

const RequestsComponent = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await loadAllRequests(currentUser.id);
        setRequests(result);
      } catch (error) {
        console.error('Failed to load requests:', error);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const removeRequestFromState = (requestId: string) => {
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  return (
    <div>
      <h2>Requests</h2>
      {requests.length === 0 && <p>No requests at the moment.</p>}
      {requests.map((request, index) => (
        <RequestContainer key={index}>
          <UserCardOuterContainer>
            <UserCard user={request.sender}></UserCard>
          </UserCardOuterContainer>
          <ButtonContainer>
            <AcceptRequestButton
              requestId={request.id}
              afterRequestAccepted={() => removeRequestFromState(request.id)}
              style={{ marginBottom: '5px' }}
            />
            <RejectRequestButton
              requestId={request.id}
              afterRequestRejected={() => removeRequestFromState(request.id)}
            />
          </ButtonContainer>
        </RequestContainer>
      ))}
    </div>
  );
};

export default RequestsComponent;
