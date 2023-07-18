import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { UserContext } from 'src/contexts/UserContext';
import { loadAllConnections } from 'src/providers/ConnectionsProvider';
import UserCard from '../users/UserCard';

interface Connection {
  id: string;
  currentUser: any;
  otherUser: any;
  createdAt: string;
}

const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

const ConnectionsComponent = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const result = await loadAllConnections(currentUser.id);
        console.log(result);
        setConnections(result);
      } catch (error) {
        console.error('Failed to load connections:', error);
      }
    };

    fetchConnections();
  }, [currentUser]);

  return (
    <div>
      <h2>Connections</h2>
      {connections.length === 0 && <p>No connections at the moment.</p>}
      {connections.map((connection, index) => (
        <ConnectionContainer key={index}>
          <UserCard user={connection.otherUser} style={{ width: '100%' }}></UserCard>
        </ConnectionContainer>
      ))}
    </div>
  );
};

export default ConnectionsComponent;
