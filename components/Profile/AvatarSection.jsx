import React from 'react';
import { getDraftProfile } from '../../context/draftStorage';

const AvatarSection = ({ avatarUrl, name, onAvatarChange, isEditing }) => {
    const draft = getDraftProfile();
    const hasDraftPhoto = draft?.photo;

    return (
        <div className="avatar-section">
            <label
                htmlFor="avatar-upload"
                className="avatar-label"
                style={{ cursor: isEditing ? 'pointer' : 'default' }}
            >
                <img className="avatar" src={avatarUrl} alt={name || "profile"} />
                {isEditing && (
                    <div className="avatar-overlay" title="Загрузить новое фото">
                        <span className="avatar-plus">＋</span>
                    </div>
                )}
                {!isEditing && draft?.photo && (
                    <div className="avatar-overlay" title="Фото ожидает модерации">
                        <span style={{ color: '#e69900', fontSize: 20 }}>⚠️</span>
                    </div>
                )}

            </label>
            <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (isEditing) {
                        onAvatarChange(e.target.files[0]);
                    }
                }}
                disabled={!isEditing} // 🔒 нельзя выбрать файл
            />
        </div>
    );
};

export default AvatarSection;
