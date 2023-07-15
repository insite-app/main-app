import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import * as AuthProvider from 'src/providers/AuthProvider';

// Mock the register function
jest.mock('src/providers/AuthProvider');

describe('RegisterForm', () => {
  it('updates on input change', () => {
    const { getByLabelText } = render(<RegisterForm />);
    const input = getByLabelText('Username:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('calls register on form submission and handles registration errors', async () => {
    jest
      .spyOn(AuthProvider, 'register')
      .mockRejectedValueOnce(new Error('Registration failed. Please try again later.'));
    const { getByLabelText, getByText, findByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText('User Type:'), { target: { value: 'testRole' } });
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testUsername' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testPassword' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'testEmail' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(async () => {
      expect(AuthProvider.register).toHaveBeenCalledWith({
        role: 'testRole',
        username: 'testUsername',
        password: 'testPassword',
        email: 'testEmail',
      });

      const errorMessage = await findByText('Registration failed. Please try again later.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
