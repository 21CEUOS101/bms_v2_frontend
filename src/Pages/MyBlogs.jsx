import React, { useEffect, useState } from 'react'
import { PostCard } from '../Components';
import BlogService from '../Services/BlogService';
import { useParams } from 'react-router-dom';

function MyBlogs() {

    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userId)
        {
            BlogService.getBlogsByUserId().then((data) => {
                setPosts(data);
            });

        }
    }, []);

    
  return (
    <div className="container mx-auto px-8 mb-8 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 ">
            {posts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </div>
          </div>
    </div>
  )
}

export default MyBlogs