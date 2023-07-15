import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/users/LoginForm';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  padding: 40px;
  background-color: #7393b3;
`;

const LoginPageHeading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLoginForm = styled(LoginForm)`
  margin-top: 20px;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  text-align: left;
`;

function LoginPage() {
  return (
    <LoginPageContainer aria-label="login-form">
      <LoginPageHeading>Log In</LoginPageHeading>
      <StyledLoginForm />
    </LoginPageContainer>
  );
}

export default LoginPage;
