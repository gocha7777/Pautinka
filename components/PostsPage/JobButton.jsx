import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../cssPages/Posts.scss';

const JobButton = ({ title, subtitle, vacancy, projectId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (vacancy?.id && projectId) {
            navigate(`/vacancy/${projectId}/${vacancy.id}`);
        } else {
            console.warn('Некорректные данные вакансии или проекта');
        }
    };

    return (
        <div className="job-button-container" onClick={handleClick}>
            <div className="job-button-content">
                <div className="job-title">{title}</div>
                <div className="job-subtitle">{subtitle || 'Уровень не указан'}</div>
            </div>
            <div className="job-button-arrow">&gt;</div>
        </div>
    );
};

export default JobButton;
