import React, { useState } from 'react';

interface User {
  id: number;
  email: string;
  active: boolean;
}

const initialUsers: User[] = [
  { id: 1, email: "luke@example.com", active: true },
  { id: 2, email: "leia@example.com", active: false },
  { id: 3, email: "han@example.com", active: true },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const toggleActive = (id: number) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
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
                onClick={() => toggleActive(user.id)}
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
