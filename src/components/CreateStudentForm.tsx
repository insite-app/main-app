import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createStudent } from '../providers/StudentProvider';
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

function CreateStudentForm() {
  const [student, setStudent] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createStudent(student);
      console.log(response.data);
      // clear the form after successful submission
      setStudent({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        Name:
        <StyledInput type="text" name="name" value={student.name} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        Email:
        <StyledInput type="email" name="email" value={student.email} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        Phone:
        <StyledInput type="tel" name="phone" value={student.phone} onChange={handleChange} required />
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

export default CreateStudentForm;
