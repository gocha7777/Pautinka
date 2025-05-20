import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import TELEGRAM_ID from '../../api/telegramId';
import ProfileService from '../../api/Services/ProfileService';
import { saveDraftProfile } from '../../context/draftStorage';
import '../../cssPages/EditPages.scss';
import { API_BASE_URL } from '../../api/config';

const EditLink = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [links, setLinks] = useState([]);
    const [originalLinks, setOriginalLinks] = useState([]);
    const [updatedLink, setUpdatedLink] = useState({ name: '', url: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            const userLinks = data.links || [];

            setProfile(data);
            setLinks(userLinks);
            setOriginalLinks(JSON.stringify(userLinks));

            if (id && userLinks.length > id) {
                const link = userLinks[parseInt(id, 10)];
                setUpdatedLink({ name: link.type || '', url: link.url || '' });
            }

            setLoading(false);
        };
        fetchProfile();
    }, [id]);

    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch {
            return null;
        }
    };

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

    const saveAllLinks = async (newLinks) => {
        try {
            await ProfileService.updateUserLinksByTelegramId(TELEGRAM_ID, newLinks);
            saveDraftProfile('links', newLinks);
        } catch (err) {
            console.error('Ошибка при обновлении ссылок:', err);
            alert('Не удалось сохранить ссылки');
        }
    };

    const handleSave = async () => {
        const index = parseInt(id, 10);
        const newLinks = [...links];

        if (!updatedLink.url || !updatedLink.name) {
            alert('Название и URL обязательны');
            return;
        }

        newLinks[index] = {
            type: updatedLink.name,
            url: updatedLink.url,
        };

        setLinks(newLinks);
        await saveAllLinks(newLinks);
        navigate('/profile/edit-links');
    };

    const handleDeleteLink = async (index) => {
        const updated = links.filter((_, i) => i !== index);
        setLinks(updated);
        await saveAllLinks(updated);
    };

    const hasChanges = JSON.stringify(links) !== originalLinks;

    if (loading) return <div>Загрузка...</div>;
    if (!profile) return <div>Профиль не найден</div>;

    if (!id) {
        return (
            <div className="add-link-container">
                <div className="add-link-card">
                    <button onClick={() => navigate(-1)} className="back-to-profile-button">
                        <h3> ← Редактирование профиля</h3>
                    </button>
                    <AvatarSection avatarUrl={getAvatarUrl()} name={profile.firstName} />
                    {links.length > 0 ? (
                        <div className="edit-link-wrapper">
                            {links.map((link, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                                    <div className="link-button">
                                        <img
                                            src={getIconUrl(link.url) || '/placeholder-icon.png'}
                                            alt={link.type || 'Иконка'}
                                            className="link-icon"
                                        />
                                        <span className="link-name">
                                            {(link.type || '').slice(0, 10)}
                                            {(link.type || '').length > 10 && '…'}
                                        </span>
                                        <button
                                            className="remove-link-btn"
                                            style={{ background: 'none', border: 'none', color: '#ff5555', fontSize: 20, cursor: 'pointer' }}
                                            title="Удалить ссылку"
                                            onClick={() => handleDeleteLink(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>Ссылки не найдены</div>
                    )}

                    <div className="edit-link-add">
                        <button className="add-link-btn" onClick={() => navigate('/profile/add-link')}>
                            Добавить Ссылку
                        </button>
                    </div>

                    {hasChanges && (
                        <div>
                            <button
                                className="add-link-btn"
                                onClick={async () => {
                                    await saveAllLinks(links);
                                    alert('Ссылки успешно сохранены!');
                                    navigate('/');
                                }}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="add-link-container">
            <div className="add-link-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection avatarUrl={getAvatarUrl()} name={profile.firstName} />
                <h3 className="add-link-title">Редактировать ссылку</h3>
                <div className="link-preview">
                    <img
                        src={getIconUrl(updatedLink.url) || '/placeholder-icon.png'}
                        alt={updatedLink.name || 'Иконка'}
                        className="link-icon"
                    />
                    <span className="link-name-preview">{updatedLink.name}</span>
                </div>
                <input
                    type="text"
                    className="link-input"
                    placeholder="Название ссылки"
                    value={updatedLink.name}
                    onChange={(e) => setUpdatedLink({ ...updatedLink, name: e.target.value })}
                />
                <input
                    type="text"
                    className="link-input"
                    placeholder="Ссылка"
                    value={updatedLink.url}
                    onChange={(e) => setUpdatedLink({ ...updatedLink, url: e.target.value })}
                />
                <button onClick={handleSave} className="add-link-btn">
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default EditLink;
