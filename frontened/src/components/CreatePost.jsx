// frontend/src/components/CreatePost.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image!');
      return;
    }

    setUploading(true);

    // Create FormData (needed for file upload)
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      const response = await axios.post(
        'http://localhost:8000/create-post',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Post created:', response.data);
      alert('Post created successfully!');

      // Call parent component's callback
      onPostCreated(response.data.post);

      // Reset form
      setCaption('');
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post: ' + (error.response?.data?.error || error.message));
    }

    setUploading(false);
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Choose Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        {/* Caption Input */}
        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows="3"
            disabled={uploading}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;