import React from 'react';
import '../../cssPages/Posts.scss'; // если ты используешь стили
import { API_BASE_URL } from '../../api/config';

const ParticipantCard = ({ name, avatarUrl }) => {
    const fullUrl = avatarUrl?.startsWith('/uploads')
        ? `${API_BASE_URL}${avatarUrl}`
        : avatarUrl || '/foto/foto-profile.png';

    return (
        <div className="participant-card">
            <img
                src={fullUrl}
                alt={name}
                className="participant-avatar"
                onError={(e) => { e.target.src = '/foto/foto-profile.png'; }}
            />
            <div className="participant-info">
                <div className="participant-name">{name}</div>
                {/* <div className="participant-role">Роль</div> */}
            </div>
        </div>
    );
};

export default ParticipantCard;
