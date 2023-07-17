import React, { useState } from 'react';
import styled from 'styled-components';
import { sendRequest } from 'src/providers/ConnectionsProvider';

interface SendRequestButtonProps {
  senderId: string;
  receiverUsername: string;
}

const StyledButton = styled.button`
  background-color: #c0e4fc;
  color: black;
  padding: 4px 8px;
  border: 1px solid darkgray;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Oxygen', sans-serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #94bbff;
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

const SendRequestButton = ({ senderId, receiverUsername }: SendRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendRequest(senderId, receiverUsername);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StyledButton onClick={handleClick} disabled={loading}>
        Send Request
      </StyledButton>
      {error && <ErrorText>Error: {error}</ErrorText>}
    </div>
  );
};

export default SendRequestButton;
