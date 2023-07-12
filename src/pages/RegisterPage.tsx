import React from 'react';
import styled from 'styled-components';
import RegisterStudentForm from '../components/users/RegisterForm';

const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  padding: 40px;
  background-color: #7393b3;
`;

const RegisterPageHeading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

function RegisterPage() {
  const StyledRegisterStudentForm = styled(RegisterStudentForm)`
    margin-top: 20px;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
  `;

  return (
    <RegisterPageContainer>
      <RegisterPageHeading>Sign Up</RegisterPageHeading>
      <StyledRegisterStudentForm />
    </RegisterPageContainer>
  );
}

export default RegisterPage;
