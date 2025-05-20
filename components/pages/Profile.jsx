import React, { useState, useEffect } from 'react';
import '../../cssPages/Styles.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import StatsRow from '../Profile/StatsRow';
import BlogBox from '../Profile/BlogBox';
import TagsList from '../Profile/TagsList';
import StatusBlock from '../Profile/StatusBlock';
import AboutMe from '../Profile/AboutMe';
import LinksSection from '../Profile/LinksSection';
import ExperienceSection from '../Profile/ExperienceSection';
import InfoField from '../Profile/InfoField';
import ProfileService from '../../api/Services/ProfileService';
import TELEGRAM_ID from '../../api/telegramId';
import {
    getDraftProfile,
    saveDraftProfile,
    clearDraftProfile
} from '../../context/draftStorage';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [editedProfile, setEditedProfile] = useState({});
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [avatarUrl, setAvatarUrl] = useState('foto/foto-profile.png');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
                if (!data) {
                    data = await ProfileService.getOrCreateUser({ telegramId: TELEGRAM_ID });
                }

                const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};

                const combinedExperiences = [...(data.experiences || [])];
                (draft.experiences || []).forEach((draftExp) => {
                    const existingIndex = combinedExperiences.findIndex(
                        e => e.company === draftExp.company && e.role === draftExp.role
                    );
                    if (existingIndex !== -1) {
                        combinedExperiences[existingIndex] = { ...draftExp, isDraft: true };
                    } else {
                        combinedExperiences.push({ ...draftExp, isDraft: true });
                    }
                });

                const serverLinks = data.links || [];
                const draftLinks = draft.links || [];
                const filteredDraftLinks = draftLinks.filter(draftLink =>
                    !serverLinks.some(serverLink =>
                        serverLink.url === draftLink.url && serverLink.type === draftLink.type
                    )
                );
                const combinedLinks = [
                    ...serverLinks,
                    ...filteredDraftLinks.map(link => ({ ...link, isDraft: true }))
                ];

                const serverTags = data.tags || [];
                const draftTagsRaw = draft.tags || [];
                const draftTagSet = new Set(draftTagsRaw);
                const combinedTagNames = new Set([...serverTags, ...draftTagsRaw]);

                const combinedTags = Array.from(combinedTagNames).map(tagName => ({
                    tagName,
                    isDraft: draftTagSet.has(tagName)
                }));

                const combined = {
                    ...data,
                    ...draft,
                    experiences: combinedExperiences,
                    links: combinedLinks,
                    tags: combinedTags,
                    description: draft.description ?? data.description,
                };

                const rawPhoto = isEditing ? draft.photo ?? data.photo : data.photo;

                if (rawPhoto) {
                    setAvatarUrl(
                        rawPhoto.startsWith('/')
                            ? `https://localhost:7268${rawPhoto}`
                            : rawPhoto
                    );
                }




                setProfile(combined); // ✅ ОБЯЗАТЕЛЬНО


                setEditedProfile({
                    firstName: combined.firstName,
                    lastName: combined.lastName,
                    middleName: combined.middleName,
                    phone: combined.phone,
                    email: combined.email,
                    university: combined.university,
                    birthDate: combined.birthDate
                        ? combined.birthDate.slice(0, 10).split('-').reverse().join('.')
                        : '',
                    course: combined.course,
                });

                setRole(combined.role);
            } catch (error) {
                console.error("Ошибка при загрузке профиля:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [location]);

    const handleChange = (field, value) => {
        setEditedProfile((prev) => ({ ...prev, [field]: value }));
        saveDraftProfile(field, value);
        setProfile((prev) => ({ ...prev, [field]: value }));
    };
    const handleAvatarUpload = async (file) => {
        try {
            const res = await ProfileService.uploadAvatar(file, TELEGRAM_ID);
            saveDraftProfile('photo', res.path); // только сохраняем как черновик
        } catch (err) {
            console.error('Ошибка загрузки аватарки', err);
            alert('Не удалось загрузить фото');
        }
    };




    const sendAllChangesToModeration = async () => {
        try {
            const draft = getDraftProfile();

            const shortStatusCurrent = profile?.statusShort ?? '';
            const shortStatusDraft = draft.shortStatus;
            const shortStatusToSend = (
                shortStatusDraft !== undefined &&
                shortStatusDraft !== shortStatusCurrent
            ) ? shortStatusDraft : null;

            const longStatusToSend = draft.longStatus ?? [];

            if (shortStatusToSend !== null || longStatusToSend.length > 0) {
                await ProfileService.updateUserStatusByTelegramId(
                    TELEGRAM_ID,
                    shortStatusToSend ?? '',
                    longStatusToSend
                );
            }

            await ProfileService.sendToModeration({
                telegramId: String(TELEGRAM_ID),
                changes: draft,
                submittedAt: new Date().toISOString(),
            });

            localStorage.removeItem(`pendingProfile_${TELEGRAM_ID}`);
            clearDraftProfile();

            alert("Профиль успешно отправлен на модерацию!");

            const updatedProfile = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            setProfile(updatedProfile);
            setEditedProfile({});
            setIsEditing(false);
        } catch (error) {
            console.error("Ошибка при отправке изменений:", error);
            alert("Ошибка при отправке изменений");
        }
    };

    const isDraft = (field) => {
        const draft = getDraftProfile();
        return draft && draft.hasOwnProperty(field);
    };

    const markDraft = (field, value) => (
        <>
            {value}
            {isDraft(field) && <sup title="Изменение не подтверждено" style={{ color: 'orange' }}> ⚠️</sup>}
        </>
    );

    if (loading) return <div>Загрузка...</div>;
    if (!profile) return <div>Профиль не найден</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <AvatarSection
                    avatarUrl={avatarUrl}
                    name={profile.firstName}
                    isEditing={isEditing}
                    onAvatarChange={handleAvatarUpload}
                />

                <button className="toggle-edit" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Просмотр' : 'Редактировать профиль'}
                </button>
                <StatsRow stats={profile?.stats} />

                <div className="info-grid">
                    <div className="info-row">
                        <InfoField
                            fields={['Имя', 'Фамилия', 'Отчество', 'Телефон', 'Почта']}
                            className="info-left"
                            isEditing={isEditing}
                            profile={profile}
                            onChange={handleChange}
                        />

                        <div className="blogbox-container">
                            <InfoField
                                fields={['ВУЗ', 'Направление', 'Курс']}
                                className="info-right"
                                isEditing={isEditing}
                                profile={profile}
                                onChange={handleChange}
                            />
                            <BlogBox />
                        </div>
                    </div>
                </div>

                <TagsList
                    tags={profile.tags || []}
                    isEditing={isEditing}
                    onAddTag={() => navigate('/profile/add-tag')}
                />
                <StatusBlock
                    statusShort={profile.statusShort || ''}
                    statusLong={profile.statusLong || []}
                    isEditing={isEditing}
                    onEditStatus={() => navigate('/profile/edit-status')}
                />

                <div className="profile-sections-layout">
                    <div className="profile-sections-right">
                        <AboutMe
                            description={profile.description || ''}
                            isEditing={isEditing}
                            onEditAboutMe={() => navigate('/profile/edit-about-me', {
                                state: { profile }
                            })}
                        />
                    </div>
                    <div className="profile-sections-left">
                        <LinksSection
                            links={profile.links || []}
                            isEditing={isEditing}
                            onEditLinks={() => navigate('/profile/edit-links')}
                        />

                        <ExperienceSection
                            experience={profile.experiences || []}
                            isEditing={isEditing}
                            onEditExperience={() => navigate('/profile/edit-experience')}
                        />
                    </div>
                </div>

                {role === 'moderator' && (
                    <div className="moderation-button-container">
                        <button className="moderation-button" onClick={() => navigate('/moderation')}>
                            Перейти на модерацию
                        </button>
                    </div>
                )}

                {isEditing && (
                    <div className="moderation-button-container">
                        <button className="moderation-button" onClick={sendAllChangesToModeration}>
                            Отправить на модерацию
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
