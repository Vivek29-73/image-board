// frontend/src/components/PostList.jsx

import React from 'react';
import './PostList.css';

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="post-list">
        <p className="no-posts">No posts yet. Create your first post above! 📸</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      <h2>All Posts ({posts.length})</h2>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <img 
              src={post.image} 
              alt={post.caption || 'Post'} 
              className="post-image"
            />
            
            {post.caption && (
              <div className="post-caption">
                <p>{post.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;