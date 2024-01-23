import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogService from '../Services/BlogService';

function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    BlogService.getAllCategories().then((newCategories) => {
      setCategories(newCategories);
    });

  }, []);


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} to={`/blogs/category/${category}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category}</span>
        </Link>
      ))}
    </div>
  )
}

export default Categories