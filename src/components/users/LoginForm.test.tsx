import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { UserContext } from 'src/contexts/UserContext';
import LoginForm from './LoginForm';
import * as AuthProvider from 'src/providers/AuthProvider';

describe('LoginForm', () => {
  it('updates the input values on change and submit the form', async () => {
    const setCurrentUser = jest.fn();
    const login = jest
      .spyOn(AuthProvider, 'login')
      .mockResolvedValue({ username: 'test', password: 'test' });

    const { getByLabelText, getByRole } = render(
      <UserContext.Provider value={{ setCurrentUser }}>
        <LoginForm />
      </UserContext.Provider>,
    );

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(login).toHaveBeenCalledWith('test', 'test');
    expect(setCurrentUser).toHaveBeenCalledWith({ username: 'test', password: 'test' });
  });

  it('handles login errors', async () => {
    const setCurrentUser = jest.fn();
    const login = jest.spyOn(AuthProvider, 'login').mockRejectedValue(new Error('Login failed'));

    const { getByLabelText, getByRole } = render(
      <UserContext.Provider value={{ setCurrentUser }}>
        <LoginForm />
      </UserContext.Provider>,
    );

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(login).toHaveBeenCalledWith('test', 'test');
    expect(setCurrentUser).not.toHaveBeenCalled();
  });
});
