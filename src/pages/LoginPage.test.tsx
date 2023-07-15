import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { UserContext } from 'src/contexts/UserContext';

describe('LoginPage', () => {
  test('renders LoginPage component', () => {
    // Mock the setCurrentUser function
    const mockSetCurrentUser = jest.fn();

    // Wrap the LoginPage component with the UserContext provider
    render(
      <UserContext.Provider value={{ setCurrentUser: mockSetCurrentUser }}>
        <LoginPage />
      </UserContext.Provider>,
    );

    // Check if page heading is present
    expect(screen.getByRole('heading')).toHaveTextContent('Log In');

    // Check if the form is present
    expect(screen.getByLabelText('login-form')).toBeInTheDocument();
  });
});
