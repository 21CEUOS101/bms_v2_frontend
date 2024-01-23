import React, { useState } from 'react';
import UserService from '../Services/UserService';

const EditProfile = () => {

  const userId = localStorage.getItem('userId');

  
  const [editedUser, setEditedUser] = useState();

  React.useEffect(() => {
    if (userId) {
      UserService.getUserById(userId).then((data) => {
        console.log(data);
        setEditedUser(data);
      });
    }
  }
  , []);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // If the input type is file (image), handle it differently
    const newValue = type === 'file' ? e.target.files[0] : value;

    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await UserService.updateUser(userId, editedUser).then((data) => {
      console.log(data);
      window.location.reload();
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-96 p-8  mx-auto px-5 mb-8">
      <h2 className="text-3xl mb-6 font-semibold border-b pb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for editing user profile */}
        <div className="mb-4">
          <label htmlFor="uName" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="uName"
            name="name"
            value={editedUser?.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedUser?.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={editedUser?.role}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block text-sm font-medium text-gray-600">
            About
          </label>
          <input
            type="text"
            id="about"
            name="about"
            value={editedUser?.about}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
            Gender
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full"
            value={editedUser?.gender}
            onChange={handleChange}
            name="gender"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* Image input */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex items-center justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
