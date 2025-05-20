import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../cssPages/Posts.scss';
import ProfileService from '../../api/Services/ProfileService';

const JobPage = () => {
  const { projectId, vacancyId } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const project = await ProfileService.getProjectById(projectId);
        const found = project.vacancies.find(v => String(v.id) === String(vacancyId));
        setVacancy(found);
      } catch (err) {
        console.error("Ошибка загрузки вакансии", err);
      }
    };

    fetchVacancy();
  }, [projectId, vacancyId]);
  console.log(vacancy + " vacancy");

  if (!vacancy) return <p>Загрузка...</p>;

  return (
    <div className="job-page">
      <div className="job-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="job-title">Вакансия</h1>
      </div>

      <div className="job-title-container">
        <p className="job-title-label">Название вакансии</p>
        <h1 className="job-title">{vacancy.title}</h1>
      </div>

      <div className="job-content">
        <div className="job-meta-container">
          <div className="job-meta-item">
            <p className="meta-label">Грэйд</p>
            <div className="meta-value">{vacancy.level || 'Не указан'}</div>
          </div>
          <div className="job-meta-item">
            <p className="meta-label">Опыт</p>
            <div className="meta-value">{vacancy.experience || 'Не указан'}</div>
          </div>
        </div>

        {vacancy.tags?.length > 0 && (
          <div className="skill-tags-container">
            <p className="skill-tags-label">Навыки</p>
            <div className="skill-tags">
              {vacancy.tags.map((tag, index) => (
                <div key={index} className="skill-tag">
                  <span>{tag.tagName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Задачи</h3>
          <div className="job-tasks-content">
            <p>{vacancy.tasks || 'Нет описания'}</p>
          </div>
        </div>

        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Требования</h3>
          <div className="job-tasks-content">
            <p>{vacancy.requirements || 'Нет требований'}</p>
          </div>
        </div>

        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Условия</h3>
          <div className="job-tasks-content">
            <p>{vacancy.conditions || 'Не указано'}</p>
          </div>
        </div>

        <div className="apply-button-container">
          <button
            className="apply-button"
            onClick={() => navigate(`/applicationform/${projectId}/${vacancyId}`)}
          >
            Откликнуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
