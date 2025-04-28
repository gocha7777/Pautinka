import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import '../../cssPages/EditPages.scss';

const AddLink = () => {
    const { profileData, setProfileData } = useProfile();
    const navigate = useNavigate(); // Используем useNavigate для навигации
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    const handleAddLink = () => {
        // Добавляем новую ссылку в массив links
        if (newLink.name && newLink.url) {
            setProfileData((prevData) => ({
                ...prevData,
                links: [...(prevData.links || []), { ...newLink, id: Date.now() }],
            }));
            setNewLink({ name: '', url: '' }); // Очищаем поля ввода
            navigate('/profile/edit-links'); // Переходим на страницу списка ссылок
        } else {
            alert('Пожалуйста, заполните и название, и ссылку.');
        }
    };

    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            return ''; // Если URL некорректный, возвращаем пустую строку
        }
    };

    return (
        <div className="add-link-container">
            <div className="add-link-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3>➔ Редактирование профиля</h3>
                </button>

                <AvatarSection avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png" name={profileData.name} />

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

                <button onClick={handleAddLink} className="add-link-btn">
                    Добавить ссылку
                </button>
            </div>
        </div>
    );
};

export default AddLink;