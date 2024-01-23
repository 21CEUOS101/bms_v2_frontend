import React, { useEffect, useState } from 'react'
import BlogService from '../Services/BlogService';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostWidget() {

  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    
    BlogService.getRecentPosts().then((data) => {
      setRecentPosts(data);
    });

  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Recent Posts</h3>
      {recentPosts.map((post, index) => (
        <Link to={`/blogs/${post.id}`} key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img src={post?.image} className="align-middle rounded-full" width="60px" height="60px" alt={post?.title}/>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-600 font-xs">{moment(post?.createdAt).format('MMM DD, YYYY')}</p>
            <Link to={`/post/${post?.slug}`} className="text-md" key={index}>{post?.title}</Link>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget