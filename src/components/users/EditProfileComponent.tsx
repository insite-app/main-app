import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import { getProfile, saveProfile } from 'src/providers/UserProvider';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import ProfilePicture from './ProfilePicture';
import DefaultTableComponent from '../utils/DefaultTableComponent';

const ProfileContainer = styled.div`
  background: #f1e6ff;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  max-width: 850px;
  margin-top: 30px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  justify-content: flex-start;
`;

const StyledInput = styled.input`
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 0px;
  font-size: 1em;
  color: #333;
  transition: border-color 0.3s;
  width: 250px;
  height: 15px;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
  font-family: 'Oxygen', sans-serif;
`;

const StyledTextarea = styled.textarea`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
  transition: border-color 0.3s;
  resize: vertical; // Allows vertical resize only
  height: 150px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
  font-family: 'Oxygen', sans-serif;
`;

const Button = styled.button`
  background-color: #ddd;
  border: none;
  color: gray;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  padding: 10px 24px;
  transition: 0.3s;
  width: 100px;

  &:hover {
    background-color: #add8e6;
  }
`;

const FieldName = styled.span`
  font-weight: bold;
  font-size: 1.25em;
`;

const EditProfileComponent = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({
    organization_name: '',
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [editing, setEditing] = useState(false);
  const [, setError] = useState(null);
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

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      await saveProfile(username, profile);
      setEditing(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <ProfileContainer>
      <Link
        to={`/users/${username}`}
        style={{ textAlign: 'left', color: 'blue', paddingBottom: '10px' }}
      >
        Go back
      </Link>
      <DefaultTableComponent
        data={[
          [
            <FieldName>Name</FieldName>,
            editing ? (
              <StyledInput
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            ) : (
              profile.name
            ),
          ],
          [
            <FieldName>Organization</FieldName>,
            editing ? (
              <StyledInput
                type="text"
                name="organization_name"
                value={profile.organization_name}
                onChange={handleInputChange}
              />
            ) : (
              profile.organization_name
            ),
          ],
          [
            <FieldName>Email</FieldName>,
            editing ? (
              <StyledInput
                type="text"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              profile.email
            ),
          ],
          [
            <FieldName>Phone</FieldName>,
            editing ? (
              <StyledInput
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            ) : (
              profile.phone
            ),
          ],
          [
            <FieldName>Bio</FieldName>,
            editing ? (
              <StyledTextarea name="bio" value={profile.bio} onChange={handleInputChange} />
            ) : (
              <div style={{ whiteSpace: 'pre-line' }}>{profile.bio}</div>
            ),
          ],
        ]}
        columnWidths={['150px', '300px']}
      />
      {currentUser && currentUser.username === username ? (
        editing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )
      ) : null}
    </ProfileContainer>
  );
};

export default EditProfileComponent;
