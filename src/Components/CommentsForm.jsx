import React, { useState } from 'react'
import CommentService from '../Services/CommentService';

function CommentsForm({ handlePostSubmission , comments , setComments , error , showSuccessMessage }) {

    const onInputChange = (e) => {
        setComments(e.target.value);
    }

    return (
    <div className="bg-white shadow-lg rounded-lg p-6 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={comments} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-blue-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted </span>}
      </div>
    </div>
  )
}

export default CommentsForm