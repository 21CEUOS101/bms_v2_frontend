import React, { useState } from 'react'
import { useParams, useRoutes } from 'react-router-dom';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../Components';
import BlogService from '../Services/BlogService';
import UserService from '../Services/UserService';
import CommentService from '../Services/CommentService';

function Post() {
  
    const { id } = useParams();

    const [post, setPost] = React.useState();
    
  React.useEffect(() => {
    if (id) {
      BlogService.getBlogById(id).then((data) => {
        setPost(data);
      });
    }
  }, []);

  const [author, setAuthor] = React.useState();

  React.useEffect(() => {
    if (post) {
      UserService.getUserByBlogId(post?.id).then((data) => {
        setAuthor(data);
      });
    }
  }
    , [post]);
  
  // for comments form

    const [refresh , setRefresh] = useState(false); // to refresh the comments component after a new comment is added 
    const [comments, setComments] = useState();
    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const userId = localStorage.getItem('userId');
  
    const handleCommentSubmission = () => {
        const blogId = post?.id;
        const commentData = { blogId , userId , comments}
        console.log(commentData);
        if (comments) {
          CommentService.createComment(blogId, commentData).then((data) => {
            setComments("");
              
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
            setRefresh((refresh) => !refresh);
              
            });
        }
        else {
            setError(true);
        }
    }
  
    return (
      <>
        <div className="container mx-auto px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
              <PostDetail post={post} />
              <Author author={author} />
              <CommentsForm blogId={post?.id} handlePostSubmission={handleCommentSubmission} comments={comments} setComments={setComments} error={error} showSuccessMessage={showSuccessMessage}/>
              <Comments blogId={post?.id} refresh={refresh} />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <PostWidget />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Post