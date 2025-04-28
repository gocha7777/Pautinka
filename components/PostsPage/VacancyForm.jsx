import React, { useState } from 'react';
import '../../cssPages/Posts.scss';
import { useProfile } from '../../context/ProfileContext';
import useProfileEditor from '../../hooks/useProfileEditor';
const VacancyForm = () => {
    const [selectedLevel, setSelectedLevel] = useState('');
    const { profileData, setProfileData } = useProfile();
    const [selectedExperience, setSelectedExperience] = useState('');

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

    return (
        <div className="vacancy-form">
            <header className="vacancy-header" onClick={() => window.history.back()}>
                <button className="back-button">←</button>
                <h1>Вакансии</h1>
            </header>

            {/* Job Title */}
            <div className="form-group">
                <label>Название вакансии</label>
                <input type="text" placeholder="Project manager" />
            </div>

            {/* Levels and Experience */}
            <div className="levels-experience">
                <div className="levels">
                    <label>
                        Добавить уровень
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle-level" />
                            <label htmlFor="toggle-level" />
                        </div>
                    </label>
                    <div className="options">
                        {['Intern', 'Junior', 'Middle', 'Senior', 'Team lead'].map((level) => (
                            <button
                                key={level}
                                className={`option ${selectedLevel === level ? 'active' : ''}`}
                                onClick={() => setSelectedLevel(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="experience">
                    <label>
                        Опыт работы
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle-experience" />
                            <label htmlFor="toggle-experience" />
                        </div>
                    </label>
                    <div className="options">
                        {['Без опыта', '0-1 год', '1-3 года', '3-5 лет', '5-7 лет', 'более 7 лет'].map(
                            (experience) => (
                                <button
                                    key={experience}
                                    className={`option ${selectedExperience === experience ? 'active' : ''
                                        }`}
                                    onClick={() => setSelectedExperience(experience)}
                                >
                                    {experience}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Tags */}
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

            {/* Tasks, Requirements, and Conditions */}
            <div className="form-group">
                <label>Задачи</label>
                <textarea placeholder="Начните вводить описание ..." />
            </div>
            <div className="form-group">
                <label>Требования</label>
                <textarea placeholder="Начните вводить описание ..." />
            </div>
            <div className="form-group">
                <label>Предлагаемые условия</label>
                <textarea placeholder="Начните вводить описание ..." />
            </div>

            {/* Submit Button */}
            <div className="submit-container">
                <button className="submit-button">Опубликовать вакансию</button>
            </div>
        </div>
    );
};

export default VacancyForm;