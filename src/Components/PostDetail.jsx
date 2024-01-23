import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../Services/UserService";

function PostDetail({ post }) {
  const [author, setAuthor] = React.useState();

  React.useEffect(() => {
    UserService.getUserByBlogId(post?.id).then((data) => {
      setAuthor(data);
    });
  }, [post]);

  const userId = localStorage.getItem("userId");
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post?.image}
            alt=""
            className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div>
              <Link
                to={`/profile/${author?.id}`}
                className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center"
              >
                <img
                  alt={author?.name}
                  height="30px"
                  width="30px"
                  className="align-middle rounded-full"
                  src={author?.image}
                />
                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                  {author?.name}
                </p>
              </Link>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post?.createdOn, "DD-MM-YYYY").format("MMM DD, YYYY")}
              </span>
            </div>
            {author?.id === userId && (
              <div className="font-medium text-blue-400 ml-4">
                <Link className="align-middle" to={`/update-post/${post?.id}`}>
                  Edit Post
                </Link>
              </div>
            )}
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post?.title}</h1>
          <div
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      </div>
    </>
  );
}

export default PostDetail;
