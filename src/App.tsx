import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SampleUserComponent } from './components/users/SampleUserComponent';
import NoMatch from './pages/NoMatchPage';
import styled from 'styled-components';
import RegisterPage from './pages/RegisterPage';
import { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import ProfileComponent from './components/users/ProfileComponent';
import { getCurrentUser, logout } from './providers/AuthProvider';
import { UserContext } from './contexts/UserContext';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Oxygen', sans-serif;
    font-weight: 400;
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
  height: 40px;
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();

        console.log(response);

        setCurrentUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <GlobalStyle />
        <Container className="App">
          <Header className="App-header">
            <nav>
              <NavItem to="/">Home</NavItem>
              {currentUser ? (
                <>
                  <NavItem to={`/users/${currentUser.username}`}>Profile</NavItem>
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
            </nav>
          </Header>
          <Routes>
            <Route path="/" element={<SampleUserComponent />} />
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
            <Route path="users/:username" element={<ProfileComponent />} />
          </Routes>
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
