import React, { useEffect, useState } from 'react'
import CommentService from '../Services/CommentService';
import moment from 'moment';
import UserService from '../Services/UserService';

function Comments({ blogId , refresh}) {

    console.log(refresh);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        
        if (blogId)
        {
            CommentService.getCommentsByBlogId(blogId).then((data) => {
                setComments(data);
            });
        }   

    }, [blogId , refresh]);

    const [authors, setAuthors] = React.useState([]);

    useEffect(() => {

        // iterate over comments array and get the author for each comment and add author to the authors array
        comments?.forEach((comment) => {
            UserService.getUserById(comment?.user).then((data) => {
                setAuthors((authors) => [...authors, data?.name]);
            });
        });

    }, [comments]);

        return (
            <>
                {comments.length > 0 && (
                    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                            {comments.length}
                            {' '}
                            Comments
                        </h3>
                        {comments.map((comment, index) => (
                            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                                <p className="mb-4">
                                    <span className="font-semibold">{authors.at(index)}</span>
                                    {' '}
                                    on
                                    {' '}
                                    {moment(comment?.createdOn, 'DD-MM-YYYY').format('MMM DD, YYYY')}
                                </p>
                                <p className="whitespace-pre-line text-gray-600 w-full">{comment?.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )
    }

export default Comments