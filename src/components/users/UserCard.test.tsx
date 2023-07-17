import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

jest.mock('./ProfilePicture', () => () => 'Mock Profile Picture');

describe('UserCard', () => {
  const user = {
    username: 'testUsername',
    name: 'Test Name',
    organization_name: 'Test Organization',
    bio: 'Test Bio',
    avatar: 'test_avatar',
  };

  it('renders the correct user information', () => {
    const { getByText } = render(
      <Router>
        <UserCard user={user} />
      </Router>,
    );

    expect(getByText('Test Name')).toBeInTheDocument();
    expect(getByText('Test Organization')).toBeInTheDocument();
    expect(getByText('Test Bio')).toBeInTheDocument();
  });

  it('creates the correct link', () => {
    const { getByText } = render(
      <Router>
        <UserCard user={user} />
      </Router>,
    );

    const linkElement = getByText('Test Name');
    expect(linkElement.getAttribute('href')).toBe('/users/testUsername');
  });

  it('renders an image', () => {
    render(
      <Router>
        <UserCard user={user} />
      </Router>,
    );
    expect(screen.getByText('Mock Profile Picture')).toBeInTheDocument();
  });
});
