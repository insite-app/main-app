import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../providers/UserProvider';
import { User } from '../../models/User';

export function SampleUserComponent() {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUsers();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <p>
        {error} Access token: {localStorage.accessToken}
        Refresh token: {localStorage.refreshToken}
      </p>
    );
  }

  return (
    <div>
      {data.map((user) => (
        <p key={user.id}>
          {user.username} - {user.email}
        </p>
      ))}
    </div>
  );
}
