import React from 'react';
import { Link } from 'react-router-dom';

const BlogBox = () => (
    <div className="blog-box">
        <Link to="/blog" className="blog-link">
            <img src="foto/кнопка.png" alt="" />
        </Link>
    </div>
);

export default BlogBox;