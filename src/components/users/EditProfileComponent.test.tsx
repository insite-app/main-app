import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { UserContext } from 'src/contexts/UserContext';
import * as UserProvider from 'src/providers/UserProvider';
import EditProfileComponent from './EditProfileComponent';
import Router from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

jest.mock('src/providers/UserProvider');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ProfileComponent', () => {
  const getProfile = UserProvider.getProfile as jest.Mock;
  const saveProfile = UserProvider.saveProfile as jest.Mock;

  const testUser = {
    username: 'test',
    organization_name: 'Test Organization',
    name: 'Test User',
    email: 'test@test.com',
    phone: '1234567890',
    bio: 'Test Bio',
  };

  const testUserWithoutUsername = {
    organization_name: 'Test Organization',
    name: 'Test User',
    email: 'test@test.com',
    phone: '1234567890',
    bio: 'Test Bio',
  };

  const currentUser = { username: 'test' };

  beforeEach(() => {
    getProfile.mockResolvedValue(testUser);
    saveProfile.mockResolvedValue({});
  });

  it('renders profile and allows editing', async () => {
    const setCurrentUser = jest.fn();
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'test' });

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <EditProfileComponent />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    // Ensure initial profile is rendered
    await waitFor(() => screen.getByText('Test Organization'));

    // Initiate edit
    fireEvent.click(screen.getByText('Edit'));

    // Edit input fields
    fireEvent.change(screen.getByDisplayValue('Test Organization'), {
      target: { value: 'New Organization' },
    });
    fireEvent.change(screen.getByDisplayValue('Test User'), { target: { value: 'New User' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Assertions
    await waitFor(() => {
      expect(saveProfile).toHaveBeenCalledWith('test', {
        ...testUser,
        organization_name: 'New Organization',
        name: 'New User',
      });
      expect(screen.getByText('New Organization')).toBeInTheDocument();
      expect(screen.getByText('New User')).toBeInTheDocument();
    });
  });
});
