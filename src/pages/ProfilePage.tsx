import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SendRequestButton from 'src/components/connections/SendRequestButton';
import ProfileComponent from 'src/components/users/ProfileComponent';
import { UserContext } from 'src/contexts/UserContext';

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div>
      <ProfileComponent username={username} />
      <Link to="/connections">Connections</Link>
      <Link to="/requests" style={{ marginLeft: '80px' }}>
        Requests
      </Link>
    </div>
  );
};

export default ProfilePage;
