import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProfilePicture from './ProfilePicture';

const OrganizationName = styled.p`
  margin: 5px 0;
  color: #666;
`;

const UserBio = styled.p`
  margin: 0;
  color: #999;
  font-size: 12px;
  white-space: pre-wrap;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #0056b3;
  }
  font-weight: bold;
`;

const UserCardContainer = styled.div`
  max-width: 350px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 18px;
`;

const UserCardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  align-items: flex-start;
`;

interface UserCardProps {
  user: any;
  style?: React.CSSProperties;
}

const UserCard = ({ user, style }: UserCardProps) => {
  return (
    <UserCardContainer style={style}>
      <UserCardHeader>
        <Link to={`/users/${user.username}`}>
          <ProfilePicture username={user.username} size={'50px'} />
        </Link>
        <UserInfo>
          <StyledLink to={`/users/${user.username}`}>{user.name}</StyledLink>
          <OrganizationName>{user.organization_name}</OrganizationName>
          <UserBio>{user.bio}</UserBio>
        </UserInfo>
      </UserCardHeader>
    </UserCardContainer>
  );
};

export default UserCard;
