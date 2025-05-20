import React, { useEffect, useState } from 'react';
import '../../../cssPages/Posts.scss';
import ProfileService from '../../../api/Services/ProfileService';
import { useNavigate } from 'react-router-dom';
import TELEGRAM_ID from '../../../api/telegramId';
import AddProjectTags from '../AddProjectTags';
import JobButton from '../JobButton';
const CreateProjectPage = () => {
    const [projectName, setProjectName] = useState('');
    const [stage, setStage] = useState('Seed Stage');
    const [profile, setProfile] = useState(null);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await ProfileService.getProfileByTelegramId(TELEGRAM_ID);
            setProfile(data);
            const allAvailableTags = await ProfileService.getAllAvailableTags();
            setAvailableTags(allAvailableTags.map(t => t.tagName));
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('pendingVacancies');
        if (stored) {
            const parsed = JSON.parse(stored);
            setVacancies(parsed);
        }
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('pendingParticipants');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setParticipants(parsed);
            } catch {
                console.warn("Ошибка при парсинге участников");
            }
        }
    }, []);

    // Если участник не имеет TelegramId, передавайте его как null или пустую строку
    const handleSubmit = async () => {
        if (!projectName.trim()) return alert("Название проекта не может быть пустым");
        if (!description.trim()) return alert("Описание проекта не может быть пустым");

        for (const participant of participants) {
            if (!participant.telegramId) {
                participant.telegramId = null;
            }
            if (!participant.name || !participant.telegramId) {
                return alert(`У участника ${participant.name} отсутствуют обязательные данные (TelegramId или Photo).`);
            }
        }

        try {
            const projectData = {
                telegramId: TELEGRAM_ID.toString(),
                name: projectName,
                description,
                stage,
                status: "pending",
                coverImage,
                tags: tags.map(tag => ({ tagName: tag })),
                participants,
                vacancies: vacancies.map(v => ({
                    ...v,
                    tags: v.tags.map(tag => ({ tagName: tag }))
                }))
            };

            await ProfileService.createProject(projectData);
            alert("Проект отправлен на модерацию!");

            // 🔥 Очищаем все localStorage черновики
            localStorage.removeItem('pendingVacancies');
            localStorage.removeItem('pendingParticipants');
            localStorage.removeItem('pendingProjectDraft');

            // Сброс UI
            setProjectName('');
            setDescription('');
            setStage('Seed Stage');
            setTags([]);
            setCoverImage(null);
            setParticipants([]);
            setVacancies([]);

            // Возвращаемся назад
            navigate('/');
        } catch (error) {
            console.error("Ошибка отправки проекта:", error);
            alert("Ошибка при отправке проекта");
        }
    };



    const handleBack = () => {
        localStorage.removeItem('pendingVacancies');
        localStorage.removeItem('pendingParticipants');
        window.history.back();
    };

    const saveDataToLocalStorage = () => {
        const projectData = {
            projectName,
            description,
            stage,
            tags,
            coverImage,
            participants,
            vacancies
        };
        localStorage.setItem('pendingProjectDraft', JSON.stringify(projectData));
        console.log("Сохраняем в localStorage:", projectData);
    };


    useEffect(() => {
        if (projectName || description || tags.length || coverImage) {
            saveDataToLocalStorage();
        }
    }, [projectName, description, tags, coverImage]);

    useEffect(() => {
        const savedDraft = localStorage.getItem('pendingProjectDraft');
        if (savedDraft) {
            const parsed = JSON.parse(savedDraft);
            setProjectName(parsed.projectName || '');
            setDescription(parsed.description || '');
            setStage(parsed.stage || 'Seed Stage');
            setTags(parsed.tags || []);
            setCoverImage(parsed.coverImage || null);
        }
    }, []);

    return (
        <div className="create-project-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
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
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-cover-input"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            try {
                                const res = await ProfileService.uploadProjectCover(file);
                                setCoverImage(res.path);
                            } catch (err) {
                                alert("Ошибка при загрузке изображения");
                                console.error(err);
                            }
                        }}
                    />
                    <label htmlFor="upload-cover-input" className="cover-button" style={{ cursor: 'pointer' }}>
                        {coverImage ? (
                            <img src={coverImage} alt="cover" className="cover-preview-img" />
                        ) : (
                            <span className="plus">+</span>
                        )}
                    </label>
                </div>

                <label className="label">Стадия проекта</label>
                <div className="stage-buttons">
                    {["Pre-Seed Stage", "Seed Stage", "Startup Stage", "Growth Stage", "Maturity Stage"].map(stageName => (
                        <button
                            key={stageName}
                            className={`stage-button ${stage === stageName ? 'active' : ''}`}
                            onClick={() => setStage(stageName)}
                        >
                            {stageName}
                        </button>
                    ))}
                </div>

                <AddProjectTags tags={tags} setTags={setTags} />

                <label className="label">Описание проекта</label>
                <textarea
                    className="textarea"
                    placeholder="Напишите общее описание..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <p className="add-participant-text">Участники</p>
                <div className="add-participant">
                    <div
                        className="add-participant-button"
                        onClick={() => {
                            localStorage.setItem('pendingParticipants', JSON.stringify(participants));
                            navigate('/add-participants');
                        }}
                    >
                        <span className="plus">+</span>
                    </div>
                    <label className="label">Добавить участника</label>
                </div>

                {participants.length > 0 && (
                    <div className="participant-list">
                        {participants.map(p => (
                            <div
                                key={p.id ?? p.telegramId ?? `${p.name}-${Math.random()}`}
                                className="participant"
                            >
                                {p.name}
                            </div>
                        ))}
                    </div>
                )}

                <div className="add-vacancy">
                    <div className="add-vacancy-button" onClick={() => navigate('/vacancyform')}>
                        <span className="plus">+</span>
                    </div>
                    <label className="label">Добавить вакансию</label>
                </div>

                {vacancies.length > 0 && (
                    <div className="vacancy-list">
                        {vacancies.map((vac, idx) => (
                            <JobButton
                                key={idx}
                                title={vac.title}
                                subtitle={vac.level || 'Уровень не указан'}
                            />
                        ))}
                    </div>
                )}

                <button className="submit-button" onClick={handleSubmit}>
                    Отправить на модерацию
                </button>
            </div>
        </div>
    );
};

export default CreateProjectPage;
