import React from 'react';
import { Link } from 'react-router-dom';

const BlogBox = () => (
    <div className="blog-box">
        <Link to="/blog" className="blog-link">
            <span>My</span>
            <span>To</span>
            <span>Blog →</span>
        </Link>
    </div>
);

export default BlogBox;