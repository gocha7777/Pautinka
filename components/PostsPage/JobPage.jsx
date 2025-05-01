import React from 'react';
import '../../cssPages/Posts.scss';
import { useNavigate } from 'react-router-dom';
const JobPage = () => {
  const navigate = useNavigate();
  const skills = ['Графический дизайн', '3D – дизайн', 'Unit – экономика', 'Golang'];
  return (
    <div className="job-page">
      <div className="job-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h1 className="job-title">Вакансия</h1>
      </div>
      <div className="job-title-container">
        <p className="job-title-label">Название вакансии</p>
        <h1 className="job-title">Data Scientist</h1>
      </div>
      <div className="job-content">
        <div className="job-meta-container">
          <div className="job-meta-item">
            <p className="meta-label">Грэйд</p>
            <div className="meta-value">Junior</div>
          </div>
          <div className="job-meta-item">
            <p className="meta-label">Опыт работы</p>
            <div className="meta-value">до 1 года</div>
          </div>
        </div>
        <div className="skill-tags-container">
          <p className="skill-tags-label">Требуемые навыки</p>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                <span>{skill}</span>
                <button
                  className="remove-button"
                  onClick={() => alert(`Скилл "${skill}" удален`)}
                  aria-label={`Remove ${skill}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Задачи</h3>
          <div className="job-tasks-content">
            <p>
              Ты станешь связующим звеном между дизайнерами, разработчиками и маркетологами. Будешь помогать доводить фичи от идеи до релиза и следить, чтобы всё шло по плану.
            </p>
            <p>Твои задачи:</p>
            <ul>
              <li>Вести доску задач и обновлять статусы</li>
              <li>Создавать таймлайны и следить за дедлайнами</li>
              <li>Созваниваться с командой и фиксировать договорённости</li>
              <li>Помогать организовывать пользовательские интервью и тестирования</li>
            </ul>
          </div>
        </div>
        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Требования</h3>
          <div className="job-tasks-content">
            <p>
              Опыт необязателен — важно, чтобы ты был(-а) организованным и не боялся(-ась) брать на себя ответственность.
            </p>
            <p>Будет плюсом:</p>
            <ul>
              <li>Умение работать с Notion, Trello или любыми таск-трекерами</li>
              <li>Базовое понимание, как работает продуктовая команда</li>
              <li>Грамотная речь и способность чётко формулировать мысли</li>
            </ul>
          </div>
        </div>
        <div className="job-tasks-container">
          <h3 className="job-tasks-title">Предлагаемые условия</h3>
          <div className="job-tasks-content">
            <p>
              Ты будешь частью молодого и амбициозного проекта. Прокачаешь навыки менеджмента в реальной практике и поработаешь с крутой командой.
            </p>
            <p>Мы предлагаем:</p>
            <ul>
              <li>Гибкий график и учёт учебной нагрузки</li>
              <li>Наставничество от опытного тимлида</li>
              <li>Возможность перейти на оплачиваемую позицию</li>
            </ul>
          </div>
        </div>
        <div className="apply-button-container">
          <button className="apply-button" onClick={() => navigate("/applicationform")}>
            Откликнуться
          </button>
        </div>
      </div>

    </div>
  );
};

export default JobPage;