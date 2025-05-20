import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import TELEGRAM_ID from '../../api/telegramId';
import ProfileService from '../../api/Services/ProfileService';
import '../../cssPages/EditPages.scss';
import { API_BASE_URL } from '../../api/config';

const EditExperiences = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [isEditingDuration, setIsEditingDuration] = useState(false);
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            const pending = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};

            const combinedExperiences = [...(data.experiences || [])];

            (pending.experiences || []).forEach((draftExp) => {
                const existingIndex = combinedExperiences.findIndex(
                    e => e.company === draftExp.company && e.role === draftExp.role
                );
                if (existingIndex !== -1) {
                    combinedExperiences[existingIndex] = { ...draftExp, isDraft: true };
                } else {
                    combinedExperiences.push({ ...draftExp, isDraft: true });
                }
            });

            const combined = {
                ...data,
                ...pending,
                experiences: combinedExperiences,
            };

            setProfile(combined);
            setExperiences(combinedExperiences);
            setDuration(combined.duration || '');
        };

        loadProfile();
    }, []);

    const getAvatarUrl = () => {
        const draftPhoto = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`))?.photo;
        const serverPhoto = profile?.photo;
        const resolved = draftPhoto ?? serverPhoto;

        return resolved
            ? resolved.startsWith('/')
                ? `${API_BASE_URL}${resolved}`
                : resolved
            : 'foto/foto-profile.png';
    };

    const handleSaveDuration = () => {
        const storageKey = `pendingProfile_${TELEGRAM_ID}`;
        const existing = JSON.parse(localStorage.getItem(storageKey)) || {};
        const updated = {
            ...profile,
            ...existing,
            duration,
        };
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setIsEditingDuration(false);
    };

    const handleDeleteExperience = (index) => {
        const updatedList = experiences.filter((_, i) => i !== index);
        setExperiences(updatedList);

        const storageKey = `pendingProfile_${TELEGRAM_ID}`;
        const existing = JSON.parse(localStorage.getItem(storageKey)) || {};
        const updatedProfile = {
            ...profile,
            ...existing,
            experiences: updatedList,
        };
        localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    };

    const getYearEnding = (years) => {
        const y = parseInt(years, 10);
        if (y === 1) return 'год';
        if (y >= 2 && y <= 4) return 'года';
        return 'лет';
    };

    return (
        <div className="edit-experiences-container">
            <div className="edit-experiences-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection
                    avatarUrl={getAvatarUrl()}
                    name={profile?.firstName || ''}
                />
                <h3 className="section-title">Опыт работы</h3>

                <div className="duration-block">
                    <div className="duration-info">
                        <span className="duration-label">Длительность</span>
                        {isEditingDuration ? (
                            <input
                                type="number"
                                min="0"
                                className="duration-input"
                                value={duration}
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
                    onClick={() => navigate('/profile/edit-experience/new')}
                    className="add-experience-btn"
                >
                    Добавить место работы
                </button>

                <div className="experiences-block">
                    {experiences.length > 0 ? (
                        experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="experience-item"
                                style={{
                                    backgroundColor: exp.isDraft ? 'rgba(255,165,0,0.1)' : 'transparent',
                                    borderLeft: exp.isDraft ? '4px solid orange' : 'none',
                                    paddingLeft: exp.isDraft ? '8px' : undefined,
                                }}
                            >
                                <div className="experience-logo">
                                    <img
                                        src={exp.logoUrl || '/placeholder-logo.png'}
                                        alt={exp.company || 'Логотип'}
                                    />
                                </div>
                                <div className="experience-details">
                                    <div className="company-name">
                                        {exp.company}
                                        {exp.isDraft && (
                                            <sup style={{ color: 'orange', marginLeft: 4 }}>⚠️</sup>
                                        )}
                                    </div>
                                    <div className="position-and-date">
                                        <span className="position-name">{exp.role}</span>
                                        <div className="date-range">
                                            {exp.workDurationYears
                                                ? `${exp.workDurationYears} ${getYearEnding(exp.workDurationYears)}`
                                                : 'Не указано'}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="delete-experience-btn"
                                    onClick={() => handleDeleteExperience(index)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-experiences">Опыт работы отсутствует.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditExperiences;
