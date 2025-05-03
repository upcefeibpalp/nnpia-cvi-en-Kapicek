import React from 'react';

interface UserProps {
  id: number;
  email: string;
  active: boolean;
  onToggle: () => void;
}

const User: React.FC<UserProps> = ({ id, email, active, onToggle }) => {
  return (
    <div className="p-2 border rounded mb-2 flex justify-between items-center">
      <div>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Active:</strong> {active ? 'Yes' : 'No'}</p>
      </div>
      <button onClick={onToggle} className="bg-blue-500 text-white px-4 py-1 rounded">
        Toggle Active
      </button>
    </div>
  );
};

export default User;
