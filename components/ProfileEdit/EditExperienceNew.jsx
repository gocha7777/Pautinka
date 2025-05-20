import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import TELEGRAM_ID from '../../api/telegramId';
import ProfileService from '../../api/Services/ProfileService';
import '../../cssPages/EditPages.scss';
import { API_BASE_URL } from '../../api/config';

const EditExperienceNew = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [newExperience, setNewExperience] = useState({
        company: '',
        department: '',
        role: '',
        workDurationYears: '',
        logoUrl: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            setProfile(data);
        };
        fetchProfile();
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

    const handleAddLocally = () => {
        if (!newExperience.company || !newExperience.role || !newExperience.department) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const storageKey = `pendingProfile_${TELEGRAM_ID}`;
        const existing = JSON.parse(localStorage.getItem(storageKey)) || {};

        const updated = {
            ...profile,
            ...existing,
            experiences: [...(existing.experiences || []), newExperience]
        };

        localStorage.setItem(storageKey, JSON.stringify(updated));
        alert('Опыт работы сохранён локально');
        navigate('/profile/edit-experience');
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewExperience({ ...newExperience, logoUrl: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-experience-new-container">
            <div className="edit-experience-new-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection
                    avatarUrl={getAvatarUrl()}
                    name={profile?.firstName || ''}
                />
                <h3 className="section-title">Опыт работы</h3>
                <div className="form-container">
                    <div className="form-row name-company">
                        <div className="name-input">
                            <label>Название компании</label>
                            <input
                                type="text"
                                className="form-input"
                                value={newExperience.company}
                                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                            />
                        </div>
                        <div className="logo-button-container">
                            <label className="add-logo-button">
                                Добавить логотип
                                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <label>Подразделение</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.department}
                            onChange={(e) => setNewExperience({ ...newExperience, department: e.target.value })}
                        />
                    </div>
                    <div className="form-row">
                        <label>Должность</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.role}
                            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                        />
                    </div>
                    <div className="form-row">
                        <label>Длительность работы</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.workDurationYears}
                            onChange={(e) =>
                                setNewExperience({ ...newExperience, workDurationYears: e.target.value })
                            }
                        />
                    </div>
                </div>
                <button onClick={handleAddLocally} className="save-btn">
                    Сохранить локально
                </button>
            </div>
        </div>
    );
};

export default EditExperienceNew;
