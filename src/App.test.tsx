import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserContext } from './contexts/UserContext';

describe('App component', () => {
  const getCurrentUser: jest.MockedFunction<() => Promise<any>> = jest.fn();
  const logout: jest.MockedFunction<() => Promise<any>> = jest.fn();
  beforeEach(() => {
    getCurrentUser.mockResolvedValue({ data: { username: 'testUser' } });
  });

  afterEach(() => {
    getCurrentUser.mockReset();
    logout.mockReset();
  });

  test('fetches current user and displays username in profile link when logged in', async () => {
    render(
      <UserContext.Provider value={{ currentUser: { username: 'testUser' } }}>
        <Router>
          <App />
        </Router>
      </UserContext.Provider>,
    );

    await waitFor(() => screen.getByText(/testUser/i));

    const linkElement = screen.getByRole('link', { name: /testUser/i });
    expect(linkElement).toBeInTheDocument();
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
  });

  test('displays Login and Sign Up links when not logged in', () => {
    render(
      <UserContext.Provider value={{ currentUser: null }}>
        <Router>
          <App />
        </Router>
      </UserContext.Provider>,
    );

    const loginLink = screen.getByRole('link', { name: /Login/i });
    const signupLink = screen.getByRole('link', { name: /Sign Up/i });
    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });
});
