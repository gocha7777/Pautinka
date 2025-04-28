import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import { CommonButton } from '../Buttons/ActionButtons';
import useProfileEditor from '../../hooks/useProfileEditor';
import StatsRow from '../Profile/StatsRow';
import '../../cssPages/EditPages.scss';

const AddTag = () => {
    const { profileData, setProfileData } = useProfile();

    const {
        state: { tags },
        hasChanges,
        handleInputChange,
        handleSave,
        handleCancel,
        handleNavigateBack,
    } = useProfileEditor(
        { tags: profileData.tags || [] },
        (updatedState) => {
            setProfileData((prevData) => ({
                ...prevData,
                tags: updatedState.tags,
            }));
        }
    );

    const availableTags = profileData?.availableTags || [];
    const unselectedTags = availableTags.filter((tag) => !tags.includes(tag));

    return (
        <div className="add-tag-container">
            <div className="add-tag-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png" name={profileData.name} />
                <StatsRow stats={profileData.stats} />

                <div className="add-tag-list">
                    {tags.map((tag, index) => (
                        <div key={index} className="add-tag-item">
                            <span className="add-tag-label">{tag}</span>
                            <button
                                onClick={() =>
                                    handleInputChange({
                                        target: {
                                            name: 'tags',
                                            value: tags.filter((t) => t !== tag),
                                        },
                                    })
                                }
                                className="add-tag-remove"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="add-tag-block">
                    <div className="add-tag-input-container">
                        <input
                            type="text"
                            className="add-tag-input"
                            placeholder="Начните вводить навык"
                        />
                        <span className="add-tag-search-icon">🔍</span>
                    </div>
                    <div className="add-tag-available-list">
                        {unselectedTags.map((tag, index) => (
                            <div
                                key={index}
                                className="add-tag-available-item"
                                onClick={() =>
                                    handleInputChange({
                                        target: {
                                            name: 'tags',
                                            value: [...tags, tag],
                                        },
                                    })
                                }
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {hasChanges && (
                    <div className="add-tag-button-group">
                        <CommonButton onClick={handleSave} className="add-tag-save-button">
                            Сохранить
                        </CommonButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTag;