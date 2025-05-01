import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import '../../cssPages/EditPages.scss'; // Подключаем стили

const EditLink = () => {
    const { profileData, setProfileData } = useProfile();
    const { id } = useParams(); // Получаем ID из URL
    const navigate = useNavigate();

    // Находим ссылку по ID или создаем пустое значение
    const link = profileData.links.find((link) => link.id === parseInt(id, 10)) || { name: '', url: '' };
    const [updatedLink, setUpdatedLink] = useState(link);

    // Проверка на наличие ссылок (вынесена в отдельный хук)
    const hasLinks = profileData.links && profileData.links.length > 0;

    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            return null; // Вернем null вместо пустой строки
        }
    };

    const handleSave = () => {
        // Сохраняем изменения в контексте
        const updatedLinks = profileData.links.map((l) =>
            l.id === link.id ? updatedLink : l
        );
        setProfileData({ ...profileData, links: updatedLinks });

        navigate('/profile/edit-links');
    };

    // Если ID отсутствует, показываем список ссылок
    if (!id) {
        return (
            <div className="add-link-container">
                <div className="add-link-card">
                    <button onClick={() => window.history.back()} className="back-to-profile-button">
                        <h3> ← Редактирование профиля</h3>
                    </button>

                    <AvatarSection avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png" name={profileData.name} />

                    {hasLinks ? (
                        <div className="edit-link-wrapper">
                            {profileData.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={`/profile/edit-link/${link.id}`}
                                    className="link-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/profile/edit-link/${link.id}`);
                                    }}
                                >
                                    <img
                                        src={link.icon || getIconUrl(link.url) || '/placeholder-icon.png'}
                                        alt={link.name || 'Иконка'}
                                        className="link-icon"
                                    />
                                    <span className="link-name">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div>Ссылки не найдены</div>
                    )}

                    <div className="edit-link-add">
                        <button
                            className="add-link-btn"
                            onClick={() => navigate('/profile/add-link')}
                        >
                            Добавить Ссылку
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Если ID существует, показываем форму редактирования
    return (
        <div className="add-link-container">
            <div className="add-link-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

                <h3 className="add-link-title">Редактировать Ссылку</h3>

                <div className="link-preview">
                    <img
                        src={updatedLink.icon || getIconUrl(updatedLink.url) || '/placeholder-icon.png'}
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