import React from 'react';

const UserSelector = ({ users, selectedUserId, onChange }) => (
  <select
  value={selectedUserId}
  name='user'
  onChange={(e) => onChange(e.target.value)}
 className="w-full sm:w-auto flex-1 px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
>
  <option value="">Select a user</option>
  {users.map(user => (
    <option key={user._id} value={user._id}>
      {user.name}
    </option>
  ))}
</select>

);

export default UserSelector;
