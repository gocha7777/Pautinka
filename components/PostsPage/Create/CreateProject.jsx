import React, { useEffect, useState } from 'react';
import '../../../cssPages/Posts.scss';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../../api/Services/ProfileService';
import TELEGRAM_ID from '../../../api/telegramId';
import MiniProjectCard from '../MiniProjectCard'; // Import the MiniProjectCard component

const CreateProject = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const telegramId = TELEGRAM_ID || localStorage.getItem('telegramId');
                if (!telegramId) {
                    throw new Error('Не удалось получить Telegram ID');
                }

                const [projectsResponse, applicationsResponse] = await Promise.all([
                    ProfileService.getProjects(telegramId),
                    ProfileService.getApplications(telegramId)
                ]);

                setProjects(projectsResponse.data || projectsResponse);
                setApplications(applicationsResponse.data || applicationsResponse);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="create-project">
            <header className="header" onClick={() => window.history.back()}>
                <button className="back-button">←</button>
                <h1 className="title">Ваши проекты</h1>
            </header>

            <div className="content">
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        {projects.length === 0 ? (
                            <p className="no-projects-text">У вас пока нет проектов...</p>
                        ) : (
                            <div className="projects-list">
                                {projects.map((project) => (
                                    <MiniProjectCard
                                        key={project.id}
                                        project={project} // Pass the project data as a prop
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="add-project" onClick={() => navigate('/createprojectpage')}>
                    <div className="add-project-button">
                        <span className="plus">+</span>
                    </div>
                    <p className="add-project-text">Добавить проект</p>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;