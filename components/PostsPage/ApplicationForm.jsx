import React, { useState } from 'react';
import '../../cssPages/Posts.scss';

const ApplicationForm = () => {
    const [selectedJob, setSelectedJob] = useState('Junior product manager');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Заявка отправлена!\nДолжность: ${selectedJob}`);
    };

    return (
        <div className="spectacle-page">
            <header className="header" onClick={() => window.history.back()}>
                <button className="back-button">←</button>
                <h1 className="title">Spectacle</h1>
            </header>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <div className="custom-select">
                        <label className="custom-label">Выберите доступную вакансию</label>
                        <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            className="custom-dropdown"
                        >
                            <option value="Junior product manager">Junior product manager</option>
                            <option value="Senior product manager">Senior product manager</option>
                            <option value="Project manager">Project manager</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Сопроводительное письмо</label>
                    <textarea
                        className="textarea"
                        placeholder="Сопроводительное письмо помогает команде лучше понять вашу мотивацию и подход к проекту"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Отправить заявку
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;