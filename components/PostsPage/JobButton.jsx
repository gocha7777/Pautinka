import React from 'react';
import '../../cssPages/Posts.scss';
import { useNavigate } from 'react-router-dom';
const JobButton = ({ title, subtitle, onClick }) => {
    const navigate = useNavigate();
    return (
        <div className="job-button-container" onClick={() => navigate("/jobpage")}>
            <div className="job-button-content">
                <div className="job-title">{title}</div>
                <div className="job-subtitle">{subtitle}</div>
            </div>
            <div className="job-button-arrow">&gt;</div>
        </div>
    );
};

export default JobButton;