import React, { useState } from 'react';
import AvatarSection from '../Profile/AvatarSection';
import { useProfile } from '../../context/ProfileContext';
import useProfileEditor from '../../hooks/useProfileEditor';
import { CommonButton } from '../Buttons/ActionButtons';
import '../../cssPages/EditPages.scss';

const EditAboutMe = () => {
    const { profileData, setProfileData } = useProfile();
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

    const {
        state: { name, description },
        hasChanges,
        handleInputChange,
        handleSave,
        handleCancel,
    } = useProfileEditor(
        { name: profileData.name, description: profileData.description },
        (updatedState) => {
            setProfileData((prevData) => ({
                ...prevData,
                ...updatedState,
            }));
        }
    );

    const toggleEditMode = () => {
        if (isEditing) {
            handleCancel(); // Revert changes when toggling off
        }
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const saveChanges = () => {
        handleSave();
        setIsEditing(false); // Exit edit mode after saving
    };

    return (
        <div className="about-container">
            <div className="about-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png" name={name} />

                <div className="about-block">
                    <div className="about-header">
                        <span className="about-title">Обо мне</span>
                        <button
                            className="about-edit-toggle"
                            onClick={toggleEditMode}
                            title={isEditing ? 'Отменить' : 'Редактировать'}
                        >
                            {isEditing ? '✕' : '✎'}
                        </button>
                    </div>

                    {isEditing ? (
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                            className={`about-description ${isEditing ? 'editing' : ''}`}
                            placeholder="Расскажите о себе"
                            readOnly={!isEditing} // Disable input unless in edit mode
                        />
                    ) : (
                        <div className="about-description">{description}</div>
                    )}
                </div>
                {hasChanges && (
                    <div className="button-group">
                        <CommonButton onClick={saveChanges} className="save-button">
                            Сохранить
                        </CommonButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditAboutMe;