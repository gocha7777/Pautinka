// ✅ ApplicationView.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileService from '../../api/Services/ProfileService';
import UserCard from '../User/UserCard';
import '../../cssPages/Posts.scss';

const ApplicationView = () => {
    const { projectId, vacancyId, telegramId } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const data = await ProfileService.getApplicationsForProject(projectId);
                const matched = data.find(
                    app => String(app.vacancyId) === vacancyId && String(app.telegramId) === telegramId
                );
                setApplication(matched);
            } catch (err) {
                setError('Не удалось загрузить отклик');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [projectId, vacancyId, telegramId]);

    const handleAccept = async () => {
        try {
            await ProfileService.addUserToProjectTeam(projectId, telegramId); // 👈 добавление участника
            await ProfileService.deleteApplication(projectId, vacancyId, telegramId); // 👈 удаление отклика
            alert('Пользователь добавлен в проект');
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert('Ошибка при добавлении участника');
        }
    };

    const handleReject = async () => {
        try {
            await ProfileService.deleteApplication(projectId, vacancyId, telegramId);
            alert('Отклик удалён');
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert('Ошибка при удалении отклика');
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error || !application) return <p className="error">{error || 'Отклик не найден'}</p>;

    return (
        <div className="create-project">
            <div className="job-header">
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1 className="job-title">Просмотр отклика</h1>
            </div>

            <div className="container">
                <h3>{application.vacancyTitle}</h3>
                <UserCard
                    id={application.userId}
                    name={application.userName}
                    photo={application.userPhoto || '/foto/default-avatar.png'}
                    hideReplyButton={true}
                />


                <div className="cover-letter">
                    <label>Сопроводительное письмо</label>
                    <div className="cover-letter-box">
                        <span>{application.coverLetter}</span>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="subscribe-btn" onClick={handleAccept}>Принять</button>
                    <button className="message-btn" onClick={handleReject}>Отклонить заявку</button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationView;