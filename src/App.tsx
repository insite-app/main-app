import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SampleStudentComponent } from './components/SampleStudentComponent';
import NoMatch from './pages/NoMatchPage';
import styled from 'styled-components';
import SignUpPage from './pages/SignUpPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Raleway', sans-serif;
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
  padding: 100px;
  color: white;
  text-decoration: none;

  &:hover {
    color: lightblue;
  }
`;

const Container = styled.div`
  text-align: center;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Container className="App">
        <Header className="App-header">
          <nav>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/register">Sign up</NavItem>
          </nav>
        </Header>
        <Routes>
          <Route path="/" element={<SampleStudentComponent/>} />
          <Route path="/register" element={<SignUpPage/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

