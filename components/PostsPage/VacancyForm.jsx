import React, { useState } from 'react';
import AddProjectTags from './AddProjectTags';
import { useNavigate } from 'react-router-dom';

const VacancyForm = () => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [tasks, setTasks] = useState('');
    const [requirements, setRequirements] = useState('');
    const [conditions, setConditions] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const isValid = title.trim() && tags.length > 0 && (tasks.trim() || requirements.trim() || conditions.trim());

    const handleSave = () => {
        if (!isValid) {
            alert("Заполните название, добавьте теги и хотя бы одно описание");
            return;
        }

        const newVacancy = {
            title,
            level,
            experience,
            tags,
            tasks,
            requirements,
            conditions,
        };

        const existingVacancies = JSON.parse(localStorage.getItem('pendingVacancies')) || [];
        existingVacancies.push(newVacancy); // ✅ добавляем, а не заменяем
        localStorage.setItem('pendingVacancies', JSON.stringify(existingVacancies));

        navigate(-1); // возвращение назад на страницу создания проекта
    };

    return (
        <div className="vacancy-form">
            <header className="vacancy-header">
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1>Новая вакансия</h1>
            </header>

            <div className="form-group">
                <label>Название вакансии</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project manager"
                />
            </div>

            <div className="levels-experience">
                <div className="levels">
                    <label>
                        Добавить уровень
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle-level" checked={!!level} readOnly />
                            <label htmlFor="toggle-level" />
                        </div>
                    </label>
                    <div className="options">
                        {['Intern', 'Junior', 'Middle', 'Senior', 'Team lead'].map((l) => (
                            <button
                                key={l}
                                className={`option ${level === l ? 'active' : ''}`}
                                onClick={() => setLevel(l)}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="experience">
                    <label>
                        Опыт работы
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle-experience" checked={!!experience} readOnly />
                            <label htmlFor="toggle-experience" />
                        </div>
                    </label>
                    <div className="options">
                        {['Без опыта', '0-1 год', '1-3 года', '3-5 лет', 'более 7 лет'].map((e) => (
                            <button
                                key={e}
                                className={`option ${experience === e ? 'active' : ''}`}
                                onClick={() => setExperience(e)}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label>Добавить метку проекта</label>
                <AddProjectTags tags={tags} setTags={setTags} />
            </div>

            <div className="form-group">
                <label>Задачи</label>
                <textarea placeholder="Начните вводить описание ..." value={tasks} onChange={(e) => setTasks(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Требования</label>
                <textarea placeholder="Начните вводить описание ..." value={requirements} onChange={(e) => setRequirements(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Предлагаемые условия</label>
                <textarea placeholder="Начните вводить описание ..." value={conditions} onChange={(e) => setConditions(e.target.value)} />
            </div>

            <div className="submit-container">
                <button className="submit-button" onClick={handleSave}>Опубликовать вакансию</button>
            </div>
        </div>
    );
};

export default VacancyForm;
