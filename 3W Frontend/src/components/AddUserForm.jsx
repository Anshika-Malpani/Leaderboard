import React, { useState } from 'react';
import { addUser } from '../api';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(name);
    setName('');
    onUserAdded();
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex h-[10%]  sm:flex-row items-center gap-4 px-2  bg-white    max-w-xl mx-auto  bottom-0"
  >
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter user name"
      className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
    <button
      type="submit"
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
    >
      Add User
    </button>
  </form>
  
  );
};

export default AddUserForm;
