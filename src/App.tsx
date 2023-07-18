import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SampleUserComponent } from './components/users/SampleUserComponent';
import NoMatch from './pages/NoMatchPage';
import styled from 'styled-components';
import RegisterPage from './pages/RegisterPage';
import { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import { getCurrentUser, logout } from './providers/AuthProvider';
import { UserContext } from './contexts/UserContext';
import SearchBar from './components/utils/SearchBar';
import SearchResultComponent from './components/search/SearchResultComponent';
import ProfilePicture from './components/users/ProfilePicture';
import EditProfileComponent from './components/users/EditProfileComponent';
import ProfilePage from './pages/ProfilePage';
import RequestsComponent from './components/connections/RequestsComponent';
import ConnectionsComponent from './components/connections/ConnectionsComponent';

const GlobalStyle = createGlobalStyle`
  :root {
    --main-font-family: 'Oxygen', sans-serif;
    --main-font-weight: 400;
  }
  
  body {
    font-family: var(--main-font-family);
    font-weight: var(--main-font-weight);
  }
`;

const Header = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  height: 10%;
`;

const NavItem = styled(Link)`
  padding: 10px 50px;
  color: white;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    color: lightblue;
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [avatarKey, setAvatarKey] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data);
      } catch (err) {}
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        avatarKey,
        refreshAvatar: () => setAvatarKey(Date.now()),
      }}
    >
      <Router>
        <GlobalStyle />
        <Container className="App">
          <Header className="App-header">
            <Navigation>
              <NavItem to="/">Home</NavItem>
              {currentUser ? (
                <>
                  <NavItem to="/" onClick={handleLogout}>
                    Logout
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem to="/register">Sign Up</NavItem>
                  <NavItem to="/login">Login</NavItem>
                </>
              )}
              <SearchBar />
              <div style={{ width: '50px' }}></div>
              {currentUser ? (
                <ProfileLink to={`/users/${currentUser.username}`}>
                  <ProfilePicture username={currentUser.username} />
                </ProfileLink>
              ) : (
                <div style={{ width: '20px' }}></div>
              )}
            </Navigation>
          </Header>
          <Routes>
            <Route path="/" element={<SampleUserComponent />} />
            <Route path="/search" element={<SearchResultComponent />} />
            <Route
              path="/register"
              element={
                currentUser ? <Navigate to={`/users/${currentUser.username}`} /> : <RegisterPage />
              }
            />
            <Route
              path="/login"
              element={
                currentUser ? <Navigate to={`/users/${currentUser.username}`} /> : <LoginPage />
              }
            />
            <Route path="*" element={<NoMatch />} />
            <Route path="users/:username" element={<ProfilePage />} />
            <Route path="users/:username/edit" element={<EditProfileComponent />} />
            <Route path="requests" element={<RequestsComponent />} />
            <Route path="connections" element={<ConnectionsComponent />} />
          </Routes>
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
