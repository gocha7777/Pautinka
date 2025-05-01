import React from 'react';
import '../../cssPages/SearchPage.scss'; // Подключаем стили

const UserCard = ({ name, role, photo }) => {
    return (
        <div className="user-card">
            <img src={photo} alt={name} className="user-photo" />
            <div className="user-info">
                <h3 className="user-name">{name}</h3>
                <p className="user-role">{role}</p>
            </div>
            <div className="user-actions">
                <button className="subscribe-btn">Подписаться</button>
                <button className="message-btn">Написать</button>
            </div>
        </div>
    );
};

export default UserCard;