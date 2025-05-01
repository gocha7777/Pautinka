import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import { CommonButton } from '../Buttons/ActionButtons';
import useProfileEditor from '../../hooks/useProfileEditor';
import '../../cssPages/EditPages.scss';

const EditStatus = () => {
    const { profileData, setProfileData } = useProfile();

    const {
        state: { shortStatus, longStatus },
        hasChanges,
        handleInputChange,
        handleSave,
        handleCancel,
    } = useProfileEditor(
        {
            shortStatus: profileData.shortStatus || '',
            longStatus: profileData.longStatus || '',
        },
        (updatedState) => {
            setProfileData((prevData) => ({
                ...prevData,
                shortStatus: updatedState.shortStatus,
                longStatus: updatedState.longStatus,
            }));
        }
    );

    return (
        <div className="edit-status-container">
            <div className="status-card">
                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png" name={profileData.name} />
                <div className="status-block">
                    {/* Short Status */}
                    <h3>Статус</h3>
                    <div className="status-item short-status">
                        <label className="status-label">Краткий статус</label>
                        <input
                            type="text"
                            name="shortStatus"
                            value={shortStatus}
                            onChange={handleInputChange}
                            className="status-input"
                            placeholder="Введите ваш статус"
                        />
                        <button className="edit-status-button">
                            ✎
                        </button>
                    </div>

                    {/* Long Status */}
                    <div className="status-item long-status">
                        <label className="status-label">Опишите что вы делаете</label>
                        <textarea
                            name="longStatus"
                            value={longStatus}
                            onChange={handleInputChange}
                            className="status-input"
                            placeholder="Опишите вашу деятельность"
                        />
                        <button className="edit-status-button">
                            ✎
                        </button>
                    </div>
                </div>
                {hasChanges && (
                    <div className="button-group">
                        <CommonButton onClick={handleSave} className="save-button">Сохранить</CommonButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditStatus;