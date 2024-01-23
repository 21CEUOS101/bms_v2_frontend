import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
// import BlogService from '../Services/BlogService';

const Header = () => {

    let { isLoggedIn } = useContext(AppContext); 

    const image = localStorage.getItem('image');
    const userId = localStorage.getItem('userId');
  
    return (
      <div className="container mx-auto px-10 mb-8">
        {isLoggedIn && <div className="border-b w-full inline-block border-blue-400 py-8">
          <div className="md:float-left block">
            <Link to="/">
              <span className="cursor-pointer font-bold text-4xl text-black">BMS 2.0</span>
            </Link>
          </div>
            <div className="hidden md:float-left md:contents">
                    {isLoggedIn && (
                    <>
                        <div className="md:float-right mt-1 align-middle text-black ml-4 font-semibold cursor-pointer">
                            <Link to={`/profile/${userId}`} className="">
                                <div className="w-10 h-10 rounded-full bg-gray-400">{image}</div>
                            </Link>
                        </div>
                        <div className="md:float-right mt-2 align-middle text-2xl text-black ml-4 font-semibold cursor-pointer">
                            <Link to="/user/blogs" className="">
                                <span>My Blogs</span>
                            </Link>
                        </div>
                    </>
                )}
          </div>
        </div>}
      </div>
    );
  };
  
  export default Header;