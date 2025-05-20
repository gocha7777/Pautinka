import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileService from '../../api/Services/ProfileService';
import '../../cssPages/Posts.scss';
import UserCard from '../User/UserCard';
import MiniProjectCard from '../PostsPage/MiniProjectCard'; // ✅ импорт карточки проекта

const ProjectApplications = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [applicationsByVacancy, setApplicationsByVacancy] = useState({});
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proj = await ProfileService.getProjectById(projectId);
                const apps = await ProfileService.getApplicationsForProject(projectId);
                console.log(apps);

                setProject(proj);

                // Группируем по вакансиям
                const grouped = {};
                for (const app of apps) {
                    if (!grouped[app.vacancyTitle]) {
                        grouped[app.vacancyTitle] = [];
                    }
                    grouped[app.vacancyTitle].push(app);
                }

                setApplicationsByVacancy(grouped);
            } catch (err) {
                setError('Не удалось загрузить отклики');
                console.error('Ошибка загрузки откликов', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="project-applications">
            <div className="job-header">
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <div className="job-title">Отклики на проект</div>
            </div>

            <div className="project-summary">
                <MiniProjectCard project={project} />
            </div>

            {Object.keys(applicationsByVacancy).length === 0 ? (
                <p className="no-projects-text">На этот проект пока никто не откликнулся.</p>
            ) : (
                <div className="vacancy-columns">
                    {Object.entries(applicationsByVacancy).map(([vacancyTitle, apps]) => (
                        <div key={vacancyTitle} className="vacancy-column">
                            <h3>{vacancyTitle}</h3>
                            {apps.map((app, idx) => (
                                <UserCard
                                    key={app.telegramId || idx}
                                    name={app.userName}
                                    role={app.userDescription?.length > 30
                                        ? app.userDescription.slice(0, 30) + '…'
                                        : app.userDescription || ''}
                                    photo={app.userPhoto || '/foto/default-avatar.png'}
                                    projectId={projectId}
                                    vacancyId={app.vacancyId}
                                    id={app.userId}
                                    telegramId={app.telegramId}
                                    replyButtonText="Отклик"
                                    onReplyClick={() =>
                                        navigate(`/application/${projectId}/${app.vacancyId}/${app.telegramId}`)
                                    }
                                />

                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectApplications;
