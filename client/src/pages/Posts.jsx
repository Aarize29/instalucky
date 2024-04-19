import React from 'react';
import dataset from '../data.json';

const Posts = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataset.data.map((post, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.media_type === 'video' ? (
              <iframe
                title="Embedded Video"
                src={post.media_url + '/embed'}
                width="320"
                height="394"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={post.media_url} alt={post.caption} className="w-full h-auto" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.caption}</h2>
              <p className="text-gray-700">{post.media_type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
