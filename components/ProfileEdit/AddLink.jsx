import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import TELEGRAM_ID from '../../api/telegramId';
import '../../cssPages/EditPages.scss';
import { CommonButton } from '../Buttons/ActionButtons';
import { getDraftProfile, saveDraftProfile } from '../../context/draftStorage';
import ProfileService from '../../api/Services/ProfileService';
import { API_BASE_URL } from '../../api/config';

const AddLink = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
                setProfile(profileData);
            } catch (error) {
                console.error('Ошибка при загрузке профиля:', error);
            }
        };
        fetchProfile();
    }, []);

    const getAvatarUrl = () => {
        const draftPhoto = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`))?.photoUrl;
        const resolvedPhoto = draftPhoto ?? profile?.photo;

        if (!resolvedPhoto) return 'foto/foto-profile.png';
        return resolvedPhoto.startsWith('/')
            ? `${API_BASE_URL}${resolvedPhoto}`
            : resolvedPhoto;
    };

    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            return '';
        }
    };

    const handleAddLink = () => {
        if (newLink.name && newLink.url) {
            const draft = getDraftProfile();
            const currentLinks = draft.links || [];
            const updatedLinks = [...currentLinks, { type: newLink.name, url: newLink.url }];
            saveDraftProfile('links', updatedLinks);
            navigate('/');
        } else {
            alert('Пожалуйста, заполните и название, и ссылку.');
        }
    };

    return (
        <div className="add-link-container">
            <div className="add-link-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection
                    avatarUrl={getAvatarUrl()}
                    name={profile?.firstName || ''}
                />

                <h3 className="add-link-title">Добавить ссылку</h3>

                <div className="link-preview">
                    {newLink.url && (
                        <img
                            src={getIconUrl(newLink.url)}
                            alt={newLink.name || 'Иконка'}
                            className="link-icon"
                        />
                    )}
                    <span className="link-name-preview">{newLink.name || 'Название ссылки'}</span>
                </div>

                <input
                    type="text"
                    className="link-input"
                    placeholder="Название ссылки"
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                />
                <input
                    type="text"
                    className="link-input"
                    placeholder="Ссылка"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />

                <CommonButton onClick={handleAddLink} className="add-link-btn">
                    Добавить ссылку
                </CommonButton>
            </div>
        </div>
    );
};

export default AddLink;
