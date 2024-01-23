import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import UserService from '../Services/UserService';
import moment from 'moment';

function Profile() {

    const userId = useParams()?.id;
    const currentUserId = localStorage.getItem('userId');
    const [user, setUser] = useState();
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (token)
        {
            if (userId != null || userId != undefined) {
                UserService.getUserById(userId).then((data) => {
                    console.log(data);
                    setUser(data);
                });
            }
            else {
                console.log('No user id');
            }
        }
    }
    , []);

  return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-96 container mx-auto px-5 mb-8">
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-semibold border-b pb-4">Profile</h3>
                    { userId == currentUserId &&  <Link to="/update-profile" className="text-blue-500 hover:text-blue-700 focus:outline-none" >
                        Edit Profile
                    </Link>}
                </div>
                <div className="flex items-center mb-6">
                    <img
                        src={user?.image}
                        alt="avatar"
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h4 className="font-semibold text-2xl">{user?.name}</h4>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                        <p className="text-gray-500 text-sm">{user?.role}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <span className="text-gray-600 font-medium w-1/3">About:</span>
                        <p className="text-sm">{user?.about}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-600 font-medium w-1/3">Gender:</span>
                        <p className="text-sm">{user?.gender}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-600 font-medium w-1/3">Created On:</span>
                        <p className="text-sm">{moment(user?.createdOn,'DD-MM-YYYY').format('MMM DD, YYYY')}</p>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default Profile