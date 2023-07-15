import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import { getProfile } from 'src/providers/UserProvider';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import ProfilePicture from './ProfilePicture';

const ProfileContainer = styled.div`
  background: #f1e6ff;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  max-width: 65%;
  margin-top: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  justify-content: flex-start;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: middle;
  margin-left: 25px;
  align-items: flex-start;
`;

const OrganizationName = styled.p`
  margin: 10px 0;
  color: #666;
  font-size: 20px;
`;

const Name = styled.p`
  margin: 0px;
  margin-top: 5px;
  color: #333;
  font-size: 36px;
  font-weight: bold;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PersonalInfo = styled.div`
  margin-top: auto;
  font-size: 14px;
  text-align: right;
  margin-left: auto;
`;

const BioHeader = styled.h3`
  text-align: left;
  margin: 0;
  padding: 0;
  margin-top: 15px;
`;

const Bio = styled.p`
  text-align: left;
  margin: 0;
  padding-top: 5px;
  white-space: pre-line;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const ProfileComponent = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({
    organization_name: '',
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getProfile(username)
      .then((data) => {
        setProfile({
          organization_name: data.organization_name || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
        });
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [username]);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfilePicture username={username} size={'100px'} />
        <HeaderInfo>
          <Name>{profile.name}</Name>
          <OrganizationName>{profile.organization_name}</OrganizationName>
        </HeaderInfo>
        <PersonalInfo>
          {currentUser && currentUser.username === username ? (
            <StyledLink to={`/users/${username}/edit`}>Edit Profile</StyledLink>
          ) : null}
          <div style={{ marginBottom: '3px', marginTop: '15px' }}>{profile.email}</div>
          <div>{profile.phone}</div>
        </PersonalInfo>
      </ProfileHeader>
      <BioHeader>About me</BioHeader>
      <Bio>{profile.bio}</Bio>
    </ProfileContainer>
  );
};
export default ProfileComponent;
