import React from 'react';
import '../../cssPages/SearchPage.scss';
import { useNavigate } from 'react-router-dom';

const UserCard = ({
    id,
    name,
    role,
    photo,
    telegramId,
    replyButtonText = "Отклик",
    hideReplyButton = false,
    onReplyClick // 👈 новый проп
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/user/${id}`);
    };

    const handleMessageClick = (e) => {
        e.stopPropagation();
        if (onReplyClick) {
            onReplyClick(); // 👈 если кастомная логика
        } else {
            navigate(`/user/${telegramId || id}/links`);
        }
    };

    return (
        <div className="user-card" onClick={handleCardClick}>
            <img src={photo} alt={name} className="user-photo" />
            <div className="user-info">
                <h3 className="user-name">{name}</h3>
                <p className="user-role">{role}</p>
            </div>

            <div className="user-actions">
                <button className="subscribe-btn">Профиль</button>
                {!hideReplyButton && (
                    <button className="message-btn" onClick={handleMessageClick}>
                        {replyButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserCard;
