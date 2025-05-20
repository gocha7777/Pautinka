import React, { useState, useEffect } from 'react';
import ProfileService from '../../api/Services/ProfileService';

const ModerationPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [profileData, projectData] = await Promise.all([
                    ProfileService.getProfilesForModeration(),
                    ProfileService.getProjectsForModeration()
                ]);
                setProfiles(profileData);
                setProjects(projectData);
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleApproveProfile = async (telegramId) => {
        if (!window.confirm('Одобрить этот профиль?')) return;

        try {
            await ProfileService.approveProfile(telegramId);
            setProfiles(prev => prev.filter(p => p.telegramId !== telegramId));
        } catch (err) {
            setError(`Ошибка при одобрении профиля: ${err.message}`);
        }
    };

    const handleRejectProfile = async (telegramId) => {
        const comment = prompt('Укажите причину отказа (минимум 5 символов):');
        if (!comment || comment.trim().length < 5) {
            alert('Необходимо указать причину отказа');
            return;
        }

        try {
            await ProfileService.rejectProfile(telegramId, comment);
            setProfiles(prev => prev.filter(p => p.telegramId !== telegramId));
        } catch (err) {
            setError(`Ошибка при отклонении профиля: ${err.message}`);
        }
    };

    const handleApproveProject = async (projectId) => {
        if (!window.confirm('Одобрить этот проект?')) return;

        try {
            await ProfileService.approveProject(projectId);
            setProjects(prev => prev.filter(p => p.id !== projectId));
        } catch (err) {
            setError(`Ошибка при одобрении проекта: ${err.message}`);
        }
    };

    const handleRejectProject = async (projectId) => {
        const comment = prompt('Укажите причину отказа (минимум 5 символов):');
        if (!comment || comment.trim().length < 5) {
            alert('Необходимо указать причину отказа');
            return;
        }

        try {
            await ProfileService.rejectProject(projectId, comment);
            setProjects(prev => prev.filter(p => p.id !== projectId));
        } catch (err) {
            setError(`Ошибка при отклонении проекта: ${err.message}`);
        }
    };

    return (
        <div className="moderation-page">
            <h1>Модерация</h1>
            {error && <div className="error">{error}</div>}
            {isLoading ? <p>Загрузка...</p> : (
                <>
                    <h2>Профили</h2>
                    {profiles.length === 0 ? (
                        <p>Нет профилей на модерации</p>
                    ) : (
                        <div className="profiles-list">
                            {profiles.map(profile => (
                                <div key={profile.telegramId} className="profile-card">
                                    <h3>{profile.firstName} {profile.lastName}</h3>
                                    <p>Telegram ID: {profile.telegramId}</p>
                                    <p>{profile.description || 'Нет описания'}</p>
                                    <div className="actions">
                                        <button onClick={() => handleApproveProfile(profile.telegramId)}>Одобрить</button>
                                        <button onClick={() => handleRejectProfile(profile.telegramId)}>Отклонить</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <h2>Проекты</h2>
                    {projects.length === 0 ? (
                        <p>Нет проектов на модерации</p>
                    ) : (
                        <div className="projects-list">
                            {projects.map(project => (
                                <div key={project.id} className="project-card">
                                    <h3>{project.name}</h3>
                                    <p>Telegram ID владельца: {project.telegramId}</p>
                                    <p>{project.description || 'Нет описания'}</p>
                                    <div className="actions">
                                        <button onClick={() => handleApproveProject(project.id)}>Одобрить</button>
                                        <button onClick={() => handleRejectProject(project.id)}>Отклонить</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ModerationPage;
