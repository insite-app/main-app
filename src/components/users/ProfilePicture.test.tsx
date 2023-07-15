import React from 'react';
import { render, act } from '@testing-library/react';
import * as userProvider from 'src/providers/UserProvider';
import ProfilePicture from './ProfilePicture';

describe('ProfilePicture', () => {
  it('fetches and displays the avatar', async () => {
    const avatarUrlPromise = Promise.resolve('http://example.com/avatar.jpg');
    const username = 'testuser';

    jest.spyOn(userProvider, 'getAvatarUrl').mockReturnValue(avatarUrlPromise);

    const { container, getByAltText } = render(<ProfilePicture username={username} />);

    expect(userProvider.getAvatarUrl).toHaveBeenCalledWith(username);
    expect(userProvider.getAvatarUrl).toReturnWith(avatarUrlPromise);

    await act(() => avatarUrlPromise);

    const imgElement = getByAltText('Profile avatar');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'http://example.com/avatar.jpg');
  });
});
