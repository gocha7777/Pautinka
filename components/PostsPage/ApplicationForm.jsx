import React, { useEffect, useState } from 'react';
import '../../cssPages/Posts.scss';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileService from '../../api/Services/ProfileService';
import TELEGRAM_ID from '../../api/telegramId';

const ApplicationForm = () => {
    const { projectId, vacancyId } = useParams();
    const navigate = useNavigate();

    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('Загрузка...');

    useEffect(() => {
        const fetchVacancyTitle = async () => {
            try {
                const project = await ProfileService.getProjectById(projectId);
                const vacancy = project.vacancies.find(v => String(v.id) === String(vacancyId));
                setVacancyTitle(vacancy?.title || 'Не найдена');
            } catch (err) {
                setVacancyTitle('Ошибка загрузки');
                console.error(err);
            }
        };

        fetchVacancyTitle();
    }, [projectId, vacancyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            await ProfileService.sendApplication({
                projectId,
                vacancyId,
                telegramId: (TELEGRAM_ID || localStorage.getItem('telegramId')).toString(),

                coverLetter,
            });

            alert('Заявка отправлена!');
            navigate(-1);
        } catch (err) {
            alert('Ошибка при отправке заявки');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="spectacle-page">
            <header className="header" onClick={() => window.history.back()}>
                <button className="back-button">←</button>
                <h1 className="title">Отклик</h1>
            </header>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <div className="custom-select">
                        <label className="custom-label">Вакансия</label>
                        <select className="custom-dropdown" disabled>
                            <option>{vacancyTitle}</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Сопроводительное письмо</label>
                    <textarea
                        className="textarea"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Сопроводительное письмо помогает команде лучше понять вашу мотивацию и подход к проекту"
                        required
                    />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
