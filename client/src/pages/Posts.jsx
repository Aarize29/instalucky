import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Posts = () => {
  const [dataset, setDataset] = useState([]);
  const accesstoken = localStorage.getItem('accesstoken');
  const userid = localStorage.getItem('userid');

  const getMediaData = async () => {
    try {
      const res = await axios.get(`https://graph.facebook.com/v19.0/${userid}/media?fields=id,media_type,media_url,like_count,thumbnail_url,permalink,username,owner,comments_count,caption,timestamp&access_token=${accesstoken}`);
      console.log(res.data.data);
      setDataset(res.data.data);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  useEffect(() => {
    getMediaData();
  }, []);

  return (
    <>
      
      <div>
        {/* Button to go back to the home page */}
        <Link to="/home" className="absolute top-0 left-0 m-4 flex  text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-3">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Go back</span>
        </Link>

        <div className="max-w-xl mx-auto mt-8">
          {/* Display posts */}
          {dataset.map(post => (
            <div key={post.id} className="max-w-md rounded overflow-hidden shadow-lg mb-8">
              {post.media_type === 'VIDEO' ? (
                <div className="relative">
                  <video className="w-full" controls>
                    <source src={post.media_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-gray-700 hover:text-indigo-500">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      Watch on Instagram
                    </span>
                  </a>
                </div>
              ) : (
                <img className="w-full" src={post.media_url} alt="Post thumbnail" />
              )}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.username}</div>
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Likes: {post.like_count}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Comments: {post.comments_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
