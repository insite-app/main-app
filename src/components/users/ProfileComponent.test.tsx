import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import * as UserProvider from 'src/providers/UserProvider';
import ProfileComponent from './ProfileComponent';

jest.mock('src/providers/UserProvider');

describe('ProfileComponent', () => {
  const getProfile = UserProvider.getProfile as jest.Mock;

  const testUser = {
    username: 'test',
    organization_name: 'Test Organization',
    name: 'Test User',
    email: 'test@test.com',
    phone: '1234567890',
    bio: 'Test Bio',
  };

  const currentUser = { username: 'test' };

  beforeEach(() => {
    getProfile.mockResolvedValue(testUser);
  });

  it('renders profile correctly', async () => {
    render(
      <UserContext.Provider value={{ currentUser }}>
        <MemoryRouter initialEntries={['/users/test']}>
          <Routes>
            <Route path="/users/:username" element={<ProfileComponent />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Assertions
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('Test Organization')).toBeInTheDocument();
      expect(screen.getByText('Test Bio')).toBeInTheDocument();
      expect(screen.getByText('test@test.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });
});
