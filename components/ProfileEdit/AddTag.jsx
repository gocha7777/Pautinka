import React, { useEffect, useState } from 'react';
import AvatarSection from '../Profile/AvatarSection';
import StatsRow from '../Profile/StatsRow';
import { CommonButton } from '../Buttons/ActionButtons';
import { useNavigate, useLocation } from 'react-router-dom';
import TELEGRAM_ID from '../../api/telegramId';
import ProfileService from '../../api/Services/ProfileService';
import { FaExclamationCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../../api/config';

const MAX_VISIBLE = 4;

const AddTag = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [initialAvailableTags, setInitialAvailableTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllUserTags, setShowAllUserTags] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const profile = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
                setProfileData(profile);

                const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};

                const serverTags = (profile?.tags || []).map(t => ({ tagName: t }));
                const draftTagsRaw = draft.tags || [];
                const draftTags = draftTagsRaw.map(t => ({ tagName: t, isDraft: true }));

                const tagMap = new Map();
                serverTags.forEach(tag => tagMap.set(tag.tagName, tag));
                draftTags.forEach(tag => tagMap.set(tag.tagName, tag));

                const combinedTags = Array.from(tagMap.values());
                setTags(combinedTags);

                const allAvailableTags = await ProfileService.getAllAvailableTags();
                setInitialAvailableTags(allAvailableTags);

                const currentTagNames = new Set(combinedTags.map(t => t.tagName));
                const filteredAvailable = allAvailableTags.filter(tag => !currentTagNames.has(tag.tagName));
                setAvailableTags(filteredAvailable);
            } catch (error) {
                console.error('Ошибка при загрузке тегов:', error);
            }
        };

        fetchTags();
    }, []);

    const updateAvailableTags = (newTags) => {
        const currentTagNames = new Set(newTags.map(t => t.tagName));
        const updatedAvailable = initialAvailableTags.filter(t => !currentTagNames.has(t.tagName));
        setAvailableTags(updatedAvailable);
    };

    const handleTagClick = (tag) => {
        if (!tags.some(t => t.tagName === tag.tagName)) {
            const newTags = [...tags, { ...tag, isDraft: true }];
            setTags(newTags);
            updateAvailableTags(newTags);
        }
    };

    const handleTagRemove = async (tag) => {
        const newTags = tags.filter(t => t.tagName !== tag.tagName);
        setTags(newTags);
        updateAvailableTags(newTags);

        try {
            const updatedTagNames = newTags.map(t => t.tagName);
            await ProfileService.updateUserTagsByTelegramId(TELEGRAM_ID, updatedTagNames);
        } catch (err) {
            console.error("Ошибка при удалении тега на сервере:", err);
        }
    };

    const handleSaveLocally = () => {
        const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};
        draft.tags = tags.map(t => t.tagName);
        localStorage.setItem(`pendingProfile_${TELEGRAM_ID}`, JSON.stringify(draft));
        navigate('/');
    };

    const filteredTags = searchTerm
        ? availableTags.filter(tag =>
            tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : availableTags.slice(0, MAX_VISIBLE);

    const visibleUserTags = showAllUserTags ? tags : tags.slice(0, MAX_VISIBLE);

    const draftPhoto = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`))?.photoUrl;
    const resolvedPhoto = draftPhoto ?? profileData?.photo;

    const avatarFullPath = resolvedPhoto
        ? resolvedPhoto.startsWith('/')
            ? `${API_BASE_URL}${resolvedPhoto}`
            : resolvedPhoto
        : 'foto/foto-profile.png';
    return (
        <div className="add-tag-container">
            <div className="add-tag-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection
                    avatarUrl={avatarFullPath}
                    name={profileData?.firstName || ''}
                />

                <StatsRow stats={profileData?.stats || {}} />

                <div className="add-tag-list">
                    {visibleUserTags.map((tag, index) => (
                        <div key={index} className="add-tag-item">
                            <span className="add-tag-label">
                                {tag.tagName}
                                {tag.isDraft && (
                                    <FaExclamationCircle
                                        title="Это черновик, ожидающий модерации"
                                        style={{ color: '#e69900', marginLeft: 4 }}
                                    />
                                )}
                            </span>
                            <button onClick={() => handleTagRemove(tag)} className="add-tag-remove">&#10005;</button>
                        </div>
                    ))}
                    {tags.length > MAX_VISIBLE && !showAllUserTags && (
                        <div className="show-more-tags" onClick={() => setShowAllUserTags(true)}>
                            Показать все теги
                        </div>
                    )}
                </div>

                <div className="add-tag-block">
                    <div className="add-tag-input-container">
                        <input
                            type="text"
                            className="add-tag-input"
                            placeholder="Начните вводить навык"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="add-tag-search-icon">🔍</span>
                    </div>

                    <div className="add-tag-available-list">
                        {filteredTags.length > 0 ? (
                            filteredTags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="add-tag-available-item"
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag.tagName}
                                </div>
                            ))
                        ) : (
                            <div className="no-tags-found">Теги не найдены</div>
                        )}
                    </div>
                </div>

                <div className="add-tag-button-group">
                    <CommonButton onClick={handleSaveLocally} className="add-tag-save-button">
                        Сохранить
                    </CommonButton>
                </div>
            </div>
        </div>
    );
};

export default AddTag;
