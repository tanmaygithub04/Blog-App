import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/posts/${id}`)
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return post ? (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Post;
