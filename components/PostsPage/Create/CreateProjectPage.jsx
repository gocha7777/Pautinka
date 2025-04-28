import React, { useState } from 'react';
import '../../../cssPages/Posts.scss';
import { useProfile } from '../../../context/ProfileContext';
import useProfileEditor from '../../../hooks/useProfileEditor';
import { useNavigate } from 'react-router-dom';
const CreateProjectPage = () => {
    const [projectName, setProjectName] = useState('');
    const [stage, setStage] = useState('Seed Stage');
    const { profileData, setProfileData } = useProfile();
    const navigate = useNavigate();
    const {
        state: { tags },
        handleInputChange,
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

    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        alert('Проект отправлен на модерацию!');
    };

    return (
        <div className="create-project-page">
            <header className="header">
                <button className="back-button" onClick={() => window.history.back()}>←</button>
                <h1 className="title">Создание проекта</h1>
                <button className="preview-button">👁️‍🗨️</button>
            </header>
            <div className="content-container">
                <div className="input-with-label">
                    <label className="input-label">Название проекта</label>
                    <input
                        type="text"
                        className="input-field"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>

                <div className="add-project-cover">
                    <label className="cover-label">Добавить обложку проекта</label>
                    <div className="cover-button">
                        <span className="plus">+</span>
                    </div>
                </div>

                <label className="label">Стадия проекта</label>
                <div className="stage-buttons">
                    {['Pre-Seed Stage', 'Seed Stage', 'Startup Stage', 'Growth Stage', 'Maturity Stage'].map(
                        (stageName) => (
                            <button
                                key={stageName}
                                className={`stage-button ${stage === stageName ? 'active' : ''}`}
                                onClick={() => setStage(stageName)}
                            >
                                {stageName}
                            </button>
                        )
                    )}
                </div>

                <div className="tags-block-container">
                    <label className="label">Добавить метку проекта</label>
                    <div className="tags-list">
                        {tags.map((tag, index) => (
                            <div key={index} className="tag">
                                <span>{tag}</span>
                                <button
                                    onClick={() =>
                                        handleInputChange({
                                            target: {
                                                name: 'tags',
                                                value: tags.filter((t) => t !== tag),
                                            },
                                        })
                                    }
                                    className="remove-tag"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="search-block">
                        <div className="search-bar">
                            <input
                                type="text"
                                name="search"
                                placeholder="Начните вводить метку"
                                onChange={handleInputChange}
                                className="search-tag-input"
                            />
                            <button className="search-icon">
                                <span role="img" aria-label="search">
                                    🔍
                                </span>
                            </button>
                        </div>
                        <div className="available-tags-list">
                            {unselectedTags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="available-tag"
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
                </div>

                <label className="label">Описание проекта</label>
                <textarea
                    className="textarea"
                    placeholder="Напишите общее описание..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <p className="add-participant-text">Участники</p>
                <div className="add-participant">
                    <div className="add-participant-button">
                        <span className="plus">+</span>
                    </div>
                    <label className="label">Добавить участника</label>
                </div>

                <p className="add-vacancy-text">Вакансии</p>
                <div className="add-vacancy">
                    <div className="add-vacancy-button" onClick={() => navigate('/vacancyform')}>
                        <span className="plus">+</span>
                    </div>
                    <label className="label">Добавить вакансию</label>
                </div>

                <button className="submit-button" onClick={handleSubmit}>
                    Отправить на модерацию
                </button>
            </div>
        </div>
    );
};

export default CreateProjectPage;