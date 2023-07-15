import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { getAvatarUrl } from 'src/providers/UserProvider';
import { UserContext } from 'src/contexts/UserContext';

interface AvatarProps {
  size?: string;
}

const AvatarImage = styled.img<AvatarProps>`
  border-radius: 50%;
  width: ${(props) => props.size || '35px'};
  height: ${(props) => props.size || '35px'};
  object-fit: cover;
  border: 1px solid #3e3e3e;
  margin-top: 4px;
`;

interface ProfilePictureProps {
  username: string;
  size?: string;
}

const ProfilePicture = ({ username, size }: ProfilePictureProps) => {
  const [imgSrc, setImgSrc] = useState(null);
  const { avatarKey } = useContext(UserContext);

  useEffect(() => {
    const getAvatar = async () => {
      const url = await getAvatarUrl(username);
      setImgSrc(url);
    };
    getAvatar();
  }, [username, avatarKey]);

  return (
    <div className="profile-picture" aria-label="Profile">
      {imgSrc && <AvatarImage size={size} src={imgSrc} alt="Profile avatar" />}
    </div>
  );
};

export default ProfilePicture;
