import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import { getProfile } from 'src/providers/UserProvider';
import { Link } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import ProfilePicture from './ProfilePicture';
import { getRequestId, checkIfConnectionExists } from 'src/providers/ConnectionsProvider';
import SendRequestButton from '../connections/SendRequestButton';
import RemoveConnectionButton from '../connections/RemoveConnectionButton';
import RejectRequestButton from '../connections/RejectRequestButton';
import AcceptRequestButton from '../connections/AcceptRequestButton';

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
  font-size: 16px;
`;

const PendingText = styled.p`
  color: #bf520d;
  margin: 0;
  font-size: 16px;
`;

const ConnectionStatus = styled.p`
  color: green;
  font-weight: bold;
  margin: 0;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;

interface ProfileComponentProps {
  username: string;
}

const ProfileComponent = ({ username }: ProfileComponentProps) => {
  const [profile, setProfile] = useState({
    id: '',
    organization_name: '',
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  const { currentUser } = useContext(UserContext);
  const [outgoingRequestExists, setOutgoingRequestExists] = useState(false);
  const [incomingRequestExists, setIncomingRequestExists] = useState(false);
  const [connectionExists, setConnectionExists] = useState(false);
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    getProfile(username)
      .then((data) => {
        setProfile({
          id: data.id || '',
          organization_name: data.organization_name || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
        });
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [username]);

  const fetchAndUpdateStatus = async () => {
    if (currentUser?.username !== username) {
      const outgoingId = await getRequestId(currentUser.id, profile.id);
      setOutgoingRequestExists(outgoingId !== '');
      if (outgoingId) {
        setRequestId(outgoingId);
        return;
      }
      const incomingId = await getRequestId(profile.id, currentUser.id);
      setIncomingRequestExists(incomingId !== '');
      if (incomingId) {
        setRequestId(incomingId);
        return;
      }
      const exists = await checkIfConnectionExists(currentUser.id, profile.id);
      setConnectionExists(exists);
    }
  };

  useEffect(() => {
    if (profile.id) {
      fetchAndUpdateStatus();
    }
  }, [currentUser, username, profile.id]);

  /** Add later
   * {connectionExists ? (
            <RemoveConnectionButton
              user1Id={currentUser.id}
              user2Id={profile.id}
              afterConnectionRemoved={fetchAndUpdateStatus}
              style={{ marginTop: '15px' }}
            />
          ) : null}
   */

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfilePicture username={username} size={'100px'} />
        <HeaderInfo>
          <Name>{profile.name}</Name>
          <OrganizationName>{profile.organization_name}</OrganizationName>
        </HeaderInfo>
        <PersonalInfo>
          {currentUser && currentUser.username !== username && (
            <div>
              {outgoingRequestExists ? (
                <PendingText>Request Pending</PendingText>
              ) : incomingRequestExists ? (
                <div>
                  <PendingText>Request Pending</PendingText>
                  <ButtonContainer>
                    <AcceptRequestButton
                      requestId={requestId}
                      afterRequestAccepted={fetchAndUpdateStatus}
                      style={{ marginRight: '5px' }}
                    />
                    <RejectRequestButton
                      requestId={requestId}
                      afterRequestRejected={fetchAndUpdateStatus}
                    />
                  </ButtonContainer>
                </div>
              ) : connectionExists ? (
                <ConnectionStatus>Connected</ConnectionStatus>
              ) : (
                <SendRequestButton
                  senderId={currentUser.id}
                  receiverId={profile.id}
                  afterRequestSent={fetchAndUpdateStatus}
                />
              )}
            </div>
          )}
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
