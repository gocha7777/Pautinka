import React, { useRef, useState } from 'react';
import '../../cssPages/Posts.scss';
import JobButton from '../PostsPage/JobButton';
import TagsPost from '../PostsPage/TagsPost';
import ParticipantCard from '../PostsPage/ParticipantCard';

const ScrollToTop = ({ project, onExpandChange }) => {
    const panelRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    const handleTouchStart = (event) => {
        touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
        touchEndY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        const diffY = touchStartY.current - touchEndY.current;

        if (Math.abs(diffY) < 30) return;

        if (diffY > 50 && !isExpanded) {
            setIsExpanded(true);
            onExpandChange(true);
        } else if (diffY < -100 && isExpanded) {
            setIsExpanded(false);
            onExpandChange(false);
        }
    };
    console.log(project.participants);

    return (
        <div
            ref={panelRef}
            className={`info-slide-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
        >
            {/* 👉 swipe-header — только зона для свайпа */}
            <div
                className="swipe-header"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="drag-bar" />

                {isExpanded ? (
                    <div className="post-content-horizontal">
                        <h1>{project.name}</h1>
                        <TagsPost tags={project.tags?.map(t => t.tagName)} />
                    </div>
                ) : (
                    <div className="description-text">{project?.description}</div>
                )}
            </div>

            {/* Контент при открытии */}
            {isExpanded && (
                <div className="content-modal">
                    <div className="modal-inner-scrollable">
                        <div className="section">
                            <h3>Участники</h3>
                            {project.participants?.length > 0 ? (
                                <div className="participants-grid">
                                    {project.participants.map((p, idx) => (
                                        <ParticipantCard
                                            key={`participant-${p.id ?? ''}-${p.telegramId ?? ''}-${idx}`}
                                            name={p.name}
                                            avatarUrl={p.photo || 'foto/foto-profile.png'}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>Участников нет</p>
                            )}
                        </div>

                        <div className="section">
                            <h3>Подробное описание</h3>
                            <p>{project?.description}</p>
                        </div>

                        <div className="section">
                            <h3>Вакансии</h3>
                            {project.vacancies?.length > 0 ? (
                                project.vacancies.map((vac, idx) => (
                                    <JobButton
                                        key={idx}
                                        title={vac.title}
                                        subtitle={vac.level || 'Уровень не указан'}
                                        vacancy={vac}
                                        projectId={project.id}
                                    />
                                ))
                            ) : (
                                <p>Нет вакансий</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScrollToTop;
