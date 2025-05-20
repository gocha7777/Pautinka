import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../cssPages/Posts.scss';

const MiniProjectCard = ({ project }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div
            className="project-card"
            onClick={() => navigate(`/project/${project.id}/applications`)}
            style={{ cursor: 'pointer' }}
        >
            <div
                className="project-image"
                style={{
                    backgroundImage: `url(${imageError
                            ? '/default-project-image.png'
                            : `https://localhost:7268${project.coverImage}`
                        })`,
                }}
            >
                {/* Invisible img tag to preload the image and handle errors */}
                <img
                    src={`https://localhost:7268${project.coverImage}`}
                    alt="Project Cover"
                    style={{ display: 'none' }}
                    onError={handleImageError}
                />
            </div>
            <div className="project-details">
                <h2>{project.name || 'Без названия'}</h2>
                <div className="tags">
                    {project.tags && project.tags.length > 0
                        ? project.tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag.tagName || 'Без тега'}
                            </span>
                        ))
                        : null}
                </div>
                <p>{project.description || 'Без описания'}</p>
                <p>
                    <strong>Статус:</strong> {project.status || '—'}
                </p>
            </div>
        </div>
    );
};

export default MiniProjectCard;