import React, { useEffect } from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import '../styles/postcard.css'
import UserService from '../Services/UserService';

function PostCard({ post , author }) {

  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img src={post?.image} alt="" className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
      </div>

      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-purple-400  text-3xl font-semibold">
        <Link to={`/post/${post?.id}`}>{post?.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <Link to={`/profile/${author?.id}`} className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <img src={author?.image} alt="" className="align-middle rounded-full" width="30px" height="30px" />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{author?.name}</p>
        </Link>
        <div className="font-medium text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 " fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">{moment(post?.createdOn, 'DD-MM-YYYY').format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post?.excerpt}
      </p>
      <div className="text-center">
        <Link to={`/blogs/${post?.id}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-gradient text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard