import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AvatarSection from '../Profile/AvatarSection';
import TELEGRAM_ID from '../../api/telegramId';
import ProfileService from '../../api/Services/ProfileService';
import { CommonButton } from '../Buttons/ActionButtons';
import '../../cssPages/EditPages.scss';
import { API_BASE_URL } from '../../api/config';

const EditStatus = () => {
    const [profile, setProfile] = useState(null);
    const [shortStatus, setShortStatus] = useState('');
    const [longStatusRaw, setLongStatusRaw] = useState('');
    const [isDraft, setIsDraft] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};

            setProfile(data);
            setShortStatus(draft.shortStatus ?? data?.shortStatus ?? '');
            const longStatusJoined = Array.isArray(draft.longStatus ?? data?.longStatus)
                ? (draft.longStatus ?? data?.longStatus).join('\n')
                : draft.longStatus ?? data?.longStatus ?? '';
            setLongStatusRaw(longStatusJoined);

            if (draft.shortStatus || draft.longStatus) setIsDraft(true);
        };
        fetchProfile();
    }, []);

    const getAvatarUrl = () => {
        const draftPhoto = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`))?.photoUrl;
        const resolvedPhoto = draftPhoto ?? profile?.photo;
        return resolvedPhoto
            ? resolvedPhoto.startsWith('/')
                ? `${API_BASE_URL}${resolvedPhoto}`
                : resolvedPhoto
            : 'foto/foto-profile.png';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'shortStatus') setShortStatus(value);
        if (name === 'longStatus') setLongStatusRaw(value);
        setHasChanges(true);
    };

    const handleSaveLocally = () => {
        const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};
        draft.shortStatus = shortStatus;
        draft.longStatus = longStatusRaw
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);
        localStorage.setItem(`pendingProfile_${TELEGRAM_ID}`, JSON.stringify(draft));
        setHasChanges(false);
        setIsDraft(true);
        alert('Изменения сохранены как черновик.');
    };

    return (
        <div className="edit-status-container">
            <div className="status-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection
                    avatarUrl={getAvatarUrl()}
                    name={profile?.firstName || ''}
                />

                <div className="status-block">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        Статус {isDraft && <FaExclamationCircle color="#e69900" title="Локально сохранённый черновик" />}
                    </h3>

                    <div className="status-item short-status">
                        <label className="status-label">Краткий статус</label>
                        <input
                            type="text"
                            name="shortStatus"
                            value={shortStatus}
                            onChange={handleInputChange}
                            className="status-input"
                            placeholder="Например: В поиске стажировки"
                        />
                    </div>

                    <div className="status-item long-status">
                        <label className="status-label">Опишите, что вы делаете</label>
                        <textarea
                            name="longStatus"
                            value={longStatusRaw}
                            onChange={handleInputChange}
                            className="status-input"
                            rows={6}
                            placeholder={'Каждая строка будет отображаться как отдельный пункт:\n• Изучаю React\n• Участвую в проекте'}
                        />
                    </div>
                </div>

                {hasChanges && (
                    <div className="button-group">
                        <CommonButton onClick={handleSaveLocally} className="save-button">
                            Сохранить как черновик
                        </CommonButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditStatus;
