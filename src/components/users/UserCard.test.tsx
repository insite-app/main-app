import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const user = {
    userAuth: { username: 'testUsername' },
    name: 'Test Name',
    organization_name: 'Test Organization',
    bio: 'Test Bio',
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
});
