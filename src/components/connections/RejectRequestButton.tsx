import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { rejectRequest } from 'src/providers/ConnectionsProvider';

interface RejectRequestButtonProps {
  requestId: string;
  afterRequestRejected?: () => void;
  style?: React.CSSProperties;
}

const StyledButton = styled.button`
  background-color: #fc6666;
  color: black;
  padding: 4px 8px;
  border: 1px solid darkgray;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
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

const RejectRequestButton = ({
  requestId,
  afterRequestRejected,
  style,
}: RejectRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await rejectRequest(requestId);
      if (afterRequestRejected) {
        afterRequestRejected();
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
        Reject
      </StyledButton>
      {error && <ErrorText>Error: {error}</ErrorText>}
    </div>
  );
};

export default RejectRequestButton;
