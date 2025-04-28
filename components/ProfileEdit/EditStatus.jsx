import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import '../../cssPages/EditPages.scss'; // Обновленные стили

const EditExperienceNew = () => {
    const { profileData, setProfileData } = useProfile();
    const navigate = useNavigate();

    const [newExperience, setNewExperience] = useState({
        company: '',
        department: '',
        position: '',
        duration: '',
        logo: '', // URL логотипа
    });

    const handleSave = () => {
        setProfileData((prevData) => ({
            ...prevData,
            experience: [
                ...prevData.experience,
                { ...newExperience, id: Date.now() },
            ],
        }));
        navigate('/profile/edit-experiences'); // Возврат к списку опыта работы
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewExperience({ ...newExperience, logo: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-experience-new-container">
            <div className="edit-experience-new-card">
                <button onClick={() => navigate(-1)} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>
                <AvatarSection
                    avatarUrl="https://cdn-icons-png.flaticon.com/512/2734/2734847.png"
                    name={profileData.name}
                />
                <h3 className="section-title">Опыт работы</h3>

                <div className="form-container">
                    <div className="form-row name-company">
                        <label>Название компании</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.company}
                            onChange={(e) =>
                                setNewExperience({ ...newExperience, company: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-row">
                        <label>Подразделение</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.department}
                            onChange={(e) =>
                                setNewExperience({ ...newExperience, department: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-row">
                        <label>Должность</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.position}
                            onChange={(e) =>
                                setNewExperience({ ...newExperience, position: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-row">
                        <label>Длительность работы</label>
                        <input
                            type="text"
                            className="form-input"
                            value={newExperience.duration}
                            onChange={(e) =>
                                setNewExperience({ ...newExperience, duration: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-row logo-row">
                        <label>Логотип компании</label>
                        <div className="logo-upload-container">
                            {newExperience.logo ? (
                                <div className="uploaded-logo">
                                    <img src={newExperience.logo} alt="Логотип компании" />
                                </div>
                            ) : (
                                <label className="add-logo-button">
                                    +
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <button onClick={handleSave} className="save-btn">
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default EditExperienceNew;