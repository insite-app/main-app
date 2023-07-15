import React, { FC, useContext, useState } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { login } from 'src/providers/AuthProvider';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  color: #282c34;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const StyledInput = styled.input`
  padding: 0.5em;
  color: #282c34;
  border: none;
  border-radius: 3px;

  ::placeholder {
    color: #282c34;
  }
`;

const StyledButton = styled.button`
  width: 100px;
  background: #282c34;
  color: white;
  border: none;
  padding: 0.5em;
  margin: 1em 0;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background: #6c757d;
  }
`;

const LoginForm: FC = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await login(username, password);
      setCurrentUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {}
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        Username:
        <StyledInput
          type="text"
          value={username}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUsername(e.target.value)
          }
          required
        />
      </StyledLabel>
      <StyledLabel>
        Password:
        <StyledInput
          type="password"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
          required
        />
      </StyledLabel>
      <StyledButton type="submit">Log In</StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
