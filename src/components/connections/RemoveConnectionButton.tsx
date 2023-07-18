import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { removeConnection } from 'src/providers/ConnectionsProvider';

interface RemoveConnectionButtonProps {
  user1Id: string;
  user2Id: string;
  afterConnectionRemoved?: () => void;
  style?: React.CSSProperties;
}

const StyledButton = styled.button`
  background-color: #fc6666;
  color: black;
  padding: 4px 8px;
  border: 1px solid darkgray;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Oxygen', sans-serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff9494;
    color: darkgray;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;

const RemoveConnectionButton = ({
  user1Id,
  user2Id,
  afterConnectionRemoved,
  style,
}: RemoveConnectionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await removeConnection(user1Id, user2Id);
      if (afterConnectionRemoved) {
        afterConnectionRemoved();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={style}>
      <StyledButton onClick={handleClick} disabled={loading}>
        Remove Connection
      </StyledButton>
      {error && <ErrorText>Error: {error}</ErrorText>}
    </div>
  );
};

export default RemoveConnectionButton;
