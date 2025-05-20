import React from 'react';
import { FaPen, FaExclamationCircle } from 'react-icons/fa';

const ExperienceSection = ({ experience = [], isEditing, onEditExperience }) => {
    const getYearEnding = (years) => {
        const y = parseInt(years, 10);
        if (y === 1) return 'год';
        if (y >= 2 && y <= 4) return 'года';
        return 'лет';
    };

    const hasExperience = experience.some(exp => !!exp.company);

    return (
        <div className="experience">
            <strong className="section-title">Опыт</strong>
            <div className="experience-list">
                {!hasExperience ? (
                    <div className="experience-placeholder">
                        <span className="about-placeholder">
                            Добавьте информацию о вашем опыте работы, стажировках или проектах
                        </span>
                        {isEditing && (
                            <button className="edit-button" onClick={onEditExperience}>
                                <FaPen className="icon" />
                            </button>
                        )}
                    </div>
                ) : (
                    experience.map((item, index) => (
                        <div
                            key={index}
                            className="experience-item"
                            style={{
                                position: 'relative',
                                backgroundColor: item.isDraft ? 'rgba(255,165,0,0.1)' : 'transparent',
                                borderLeft: item.isDraft ? '4px solid orange' : 'none',
                                paddingLeft: item.isDraft ? '8px' : undefined,
                                paddingRight: '24px',
                            }}
                        >
                            {item.isDraft && (
                                <FaExclamationCircle
                                    title="Это черновик, ожидающий модерации"
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        color: '#e69900',
                                        fontSize: 16,
                                    }}
                                />
                            )}
                            <div className="experience-logo-wrapper">
                                <img
                                    src={item.logoUrl || '/placeholder-logo.png'}
                                    alt="логотип компании"
                                    className="company-icon"
                                />
                            </div>
                            <div className="experience-details">
                                <strong>{item.company || 'Не указано'}</strong>
                                <p>{item.department || 'Отдел не указан'}</p>
                                <span>
                                    {item.workDurationYears
                                        ? `${item.workDurationYears} ${getYearEnding(item.workDurationYears)}`
                                        : 'Длительность не указана'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isEditing && hasExperience && (
                <button className="edit-button" onClick={onEditExperience}>
                    <FaPen className="icon" />
                </button>
            )}
        </div>
    );
};

export default ExperienceSection;
