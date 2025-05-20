import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import { CommonButton } from '../Buttons/ActionButtons';
import '../../cssPages/EditPages.scss';
import { saveDraftProfile } from '../../context/draftStorage';
import TELEGRAM_ID from '../../api/telegramId';
import { API_BASE_URL } from '../../api/config';

const EditAboutMe = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const profile = location.state?.profile;
    const refreshProfile = location.state?.refreshProfile;

    const [description, setDescription] = useState(
        profile?.description || ''
    );

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

    const saveLocally = () => {
        saveDraftProfile('description', description); // сохраняем как черновик

        if (refreshProfile) {
            refreshProfile((prev) => ({
                ...prev,
                description,
            }));
        }

        navigate('/');
    };

    return (
        <div className="about-container">
            <div className="about-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection
                    avatarUrl={getAvatarUrl()}
                    name={profile?.firstName}
                />

                <div className="about-block">
                    <div className="about-header">
                        <span className="about-title">Обо мне</span>
                    </div>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="about-description editing"
                        placeholder="Расскажите о себе"
                    />
                </div>

                <div className="button-group">
                    <CommonButton onClick={saveLocally} className="save-button">
                        Сохранить
                    </CommonButton>
                </div>
            </div>
        </div>
    );
};

export default EditAboutMe;
