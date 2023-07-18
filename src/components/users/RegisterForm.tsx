import React, { useState, ChangeEvent, FormEvent } from 'react';
import { register } from 'src/providers/AuthProvider';
import styled from 'styled-components/macro';

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

function RegisterForm() {
  const [user, setUser] = useState({ username: '', password: '', email: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(user);
      setUser({ username: '', password: '', email: '', role: '' });
      setError('');
    } catch (error: any) {
      if (error.message === 'Username already taken') {
        setError('Username already taken. Please choose a different username.');
      } else {
        setError('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        User Type:
        <StyledInput type="text" name="role" value={user.role} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        Username:
        <StyledInput
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </StyledLabel>
      <StyledLabel>
        Password:
        <StyledInput
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </StyledLabel>
      <StyledLabel>
        Email:
        <StyledInput
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </StyledLabel>
      {error && <div>{error}</div>}
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

export default RegisterForm;
