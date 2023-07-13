import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const SearchInput = styled.input`
  font-family: var(--main-font-family);
  font-weight: var(--main-font-weight);
  padding: 5px;
  border-radius: 20px;
  border: 1px solid lightgray;
  width: 200px;
  outline: none;
  margin-right: 10px;
  font-size: 14px;
`;

const SearchButton = styled.button`
  font-family: var(--main-font-family);
  font-weight: var(--main-font-weight);
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid lightgray;
  background-color: lightgray;
  color: black;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: darkgray;
    color: white;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    navigate(`/search?q=${searchTerm}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
