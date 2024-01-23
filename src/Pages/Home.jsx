import { useParams } from 'react-router-dom';
import { PostCard , PostWidget , Categories } from '../Components'
import BlogService from '../Services/BlogService';
import React, { useEffect, useState } from 'react'
import UserService from '../Services/UserService';

function Home() {

    const { category } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (category) {
            BlogService.getBlogsByCategoryId(category).then((data) => {
                setPosts(data);
            });
        }
        else {
            BlogService.getAllBlogs().then((data) => {
                setPosts(data);
            });
        }

    }, []);

    const [authors , setAuthors] = React.useState([]);
  
    useEffect(() => {
                
        // iterate over the posts array and get the author for each post and add author to the authors array
        posts?.forEach((post) => {
            UserService.getUserByBlogId(post?.id).then((data) => {
                console.log(data);
                setAuthors((authors) => [...authors, data]);
            });
        });

        console.log(authors);

    }
    , [posts]);
    
  return (
      <div className="container mx-auto px-10 mb-8 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 ">
            {posts?.map((post, index) => (
                <PostCard key={index} post={post} author={authors.at(index)}/>
            ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
                <PostWidget />
                <Categories />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Home