import React, { useState, useEffect } from 'react';
import './App.css';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch posts when app loads
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/posts');
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to fetch posts');
    }
    setLoading(false);
  };

  const handlePostCreated = (newPost) => {
    // Add new post to the beginning of the list
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📸 Image Upload App</h1>
      </header>

      <main className="App-main">
        <CreatePost onPostCreated={handlePostCreated} />
        
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </div>
  );
}

export default App;