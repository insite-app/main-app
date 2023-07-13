import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { search } from 'src/providers/SearchProvider';
import UserCard from 'src/components/users/UserCard';
import styled from 'styled-components';

const ResultContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SearchResultComponent = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q');
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      if (searchTerm) {
        const results = await search(searchTerm);
        setResults(results);
      }
    }
    fetchResults();
  }, [searchTerm]);

  if (!results) {
    return <div>No search performed yet</div>;
  }

  if (results.total === 0) {
    return <div>No results found</div>;
  }

  return (
    <ResultContainer>
      <h2>Search Results:</h2>
      {results.data.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </ResultContainer>
  );
};

export default SearchResultComponent;
