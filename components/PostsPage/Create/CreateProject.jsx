import React from 'react';
import '../../../cssPages/Posts.scss';
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
    const navigate = useNavigate();

    return (
        <div className="create-project">
            <header className="header" onClick={() => window.history.back()}>
                <button className="back-button">←</button>
                <h1 className="title">Создание проекта</h1>
            </header>
            <div className="content">
                <p className="no-projects-text">У вас пока нет проектов...</p>
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