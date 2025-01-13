import React from "react";
import useUsers from "./useUsers"; // Corrected path

const Page = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li> // Adjust this line according to your user data structure
        ))}
      </ul>
    </div>
  );
};

export default Page;
