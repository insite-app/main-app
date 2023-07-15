import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from './contexts/UserContext';
import App from './App';
import { getCurrentUser } from './providers/AuthProvider';

jest.mock('./providers/AuthProvider', () => ({
  getCurrentUser: jest.fn(),
  logout: jest.fn(),
}));

describe('App component', () => {
  test('renders App component', () => {
    render(
      <UserContext.Provider value={{ currentUser: null, setCurrentUser: jest.fn() }}>
        <App />
      </UserContext.Provider>,
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders App with user logged in', async () => {
    const mockUser = { username: 'test_user' };
    const getCurrentUserMock = getCurrentUser as jest.Mock;
    getCurrentUserMock.mockResolvedValue({ data: mockUser });

    render(
      <UserContext.Provider value={{ currentUser: null, setCurrentUser: jest.fn() }}>
        <App />
      </UserContext.Provider>,
    );

    expect(getCurrentUserMock).toHaveBeenCalled();

    // Wait for the component to re-render after the getCurrentUser call
    await screen.findByText(/Logout/i);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    // Expect the profile picture to be rendered (by looking for the href to the user's profile)
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'href',
      '/users/test_user',
    );
  });

  // You could add more tests, like checking if the correct page is rendered when navigating etc.
});
