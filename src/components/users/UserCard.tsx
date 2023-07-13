import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserCardContainer = styled.div`
  max-width: 350px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const UserName = styled.h4`
  margin: 0;
  color: #333;
`;

const OrganizationName = styled.p`
  margin: 10px 0;
  color: #666;
`;

const UserBio = styled.p`
  margin: 0;
  color: #999;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #0056b3;
  }
`;

const UserCard = ({ user }) => {
  return (
    <UserCardContainer>
      <UserName>
        <StyledLink to={`/users/${user.userAuth.username}`}>{user.name}</StyledLink>
      </UserName>
      <OrganizationName>{user.organization_name}</OrganizationName>
      <UserBio>{user.bio}</UserBio>
    </UserCardContainer>
  );
};

export default UserCard;
