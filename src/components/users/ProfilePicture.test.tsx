import React from 'react';
import { render, act } from '@testing-library/react';
import * as userProvider from 'src/providers/UserProvider';
import ProfilePicture from './ProfilePicture';
import { UserContext } from 'src/contexts/UserContext'; // Update with your correct import path

describe('ProfilePicture', () => {
  it('fetches and displays the avatar', async () => {
    const avatarUrlPromise = Promise.resolve('http://example.com/avatar.jpg');
    const username = 'testuser';

    jest.spyOn(userProvider, 'getAvatarUrl').mockReturnValue(avatarUrlPromise);

    const { getByAltText } = render(
      <UserContext.Provider value={{ avatarKey: 'mocked-avatar-key' }}>
        <ProfilePicture username={username} />
      </UserContext.Provider>,
    );

    expect(userProvider.getAvatarUrl).toHaveBeenCalledWith(username);
    expect(userProvider.getAvatarUrl).toReturnWith(avatarUrlPromise);

    await act(() => avatarUrlPromise);

    const imgElement = getByAltText('Profile avatar');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'http://example.com/avatar.jpg');
  });
});
