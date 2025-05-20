import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileService from '../../api/Services/ProfileService';
import LinksSection from '../Profile/LinksSection';
import AvatarSection from '../Profile/AvatarSection';
import '../../cssPages/SearchPage.scss'; // 👈 отдельный scss файл

const UserLinksPage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams(); // если id — это telegramId
    const navigate = useNavigate();

    useEffect(() => {
        ProfileService.getUserById(id) // или getProfileByTelegramId(id)
            .then(setUser)
            .catch(console.error);
    }, [id]);

    if (!user) return <p>Загрузка...</p>;

    return (
        <div className="user-links-page">
            <div className="user-links-card">
                <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
                <AvatarSection
                    avatarUrl={user.photoUrl || '/foto/foto-profile.png'}
                    name={user.firstName || 'Пользователь'}
                />
                <h2 className="links-heading">Ссылки пользователя {user.firstName}</h2>
                <LinksSection links={user.links || []} isEditing={false} />
            </div>
        </div>
    );
};

export default UserLinksPage;
