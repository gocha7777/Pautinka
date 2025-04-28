import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import '../../cssPages/EditPages.scss'; // Подключаем стили

const EditExperiences = () => {
    const { profileData, setProfileData } = useProfile();
    const navigate = useNavigate(); // Используем для навигации
    const [isEditingDuration, setIsEditingDuration] = useState(false);
    const [duration, setDuration] = useState(profileData.duration || '');

    const experiences = profileData.experience || [];

    const handleSaveDuration = () => {
        setProfileData((prevData) => ({
            ...prevData,
            duration,
        }));
        setIsEditingDuration(false);
    };

    return (
        <div className="edit-experiences-container">
            <div className="edit-experiences-card">

                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection
                    avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png"
                    name={profileData.name}
                />
                <h3 className="section-title">Опыт работы</h3>

                {/* Длительность работы */}
                <div className="duration-block">
                    <div className="duration-info">
                        <span className="duration-label">Длительность</span>
                        {isEditingDuration ? (
                            <input
                                type="number"
                                min="0"
                                className="duration-input"
                                value={duration.replace(/\D/g, '')} // Убираем нечисловые символы
                                onChange={(e) => setDuration(e.target.value)}
                                onBlur={handleSaveDuration}
                            />
                        ) : (
                            <span className="duration-value">{duration}</span>
                        )}
                    </div>
                    <button
                        className="edit-duration-btn"
                        onClick={() => setIsEditingDuration(!isEditingDuration)}
                    >
                        ✎
                    </button>
                </div>

                <button
                    onClick={() => navigate('/profile/edit-experience/new')} // Перенаправление
                    className="add-experience-btn"
                >
                    Добавить место работы
                </button>
                <div className="experiences-block">

                    {experiences.map((exp) => (
                        <div key={exp.id} className="experience-item">
                            <div className="experience-logo">
                                <img
                                    src={`https://logo.clearbit.com/${exp.company.toLowerCase()}.com`}
                                    alt={exp.company}
                                />
                            </div>
                            <div className="experience-details">
                                <div className="company-name">{exp.company}</div>
                                <div className="position-and-date">
                                    <span className="position-name">{exp.position}</span>
                                    <span className="date-range">
                                        {exp.startDate} — {exp.endDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditExperiences;