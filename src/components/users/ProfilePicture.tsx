import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAvatarUrl } from 'src/providers/UserProvider';

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;
  border: 1px solid #3e3e3e;
  margin-top: 4px;
`;

const ProfilePicture = ({ username }) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const getAvatar = async () => {
      const url = await getAvatarUrl(username);
      setImgSrc(url);
    };
    getAvatar();
  }, [username]);

  return (
    <div className="profile-picture">
      {imgSrc && <AvatarImage src={imgSrc} alt="Profile avatar" />}
    </div>
  );
};

export default ProfilePicture;
