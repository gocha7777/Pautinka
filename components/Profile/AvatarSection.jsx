import React from 'react';

const AvatarSection = ({ avatarUrl, name }) => (
    <div className="avatar-section">
        <img className="avatar" src={avatarUrl} alt="profile" />
        <div className="name user">{name}</div>
    </div>
);

export default AvatarSection;