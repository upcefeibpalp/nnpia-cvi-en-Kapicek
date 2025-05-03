import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  active: boolean;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Načti uživatele z backendu
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:8080/api/v1/users");
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const toggleActive = async (user: User) => {
    const url = `http://localhost:8080/api/v1/users/${user.id}/${user.active ? 'deactivate' : 'activate'}`;
    await fetch(url, { method: 'POST' });

    setUsers(users.map(u =>
      u.id === user.id ? { ...u, active: !u.active } : u
    ));
  };

  return (
    <table className="min-w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Active</th>
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="text-center">
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.active ? 'Yes' : 'No'}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => toggleActive(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
