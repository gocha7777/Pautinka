import React, { useRef, useState } from 'react';
import TagsList from '../Profile/TagsList';
import { useProfile } from '../../context/ProfileContext';
import '../../cssPages/Posts.scss';
import TeamList from '../PostsPage/TeamList';
import JobButton from '../PostsPage/JobButton';

const ScrollToTop = ({ project, onExpandChange }) => {
    const panelRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { profileData } = useProfile();
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

        if (diffY > 50 && !isExpanded) {
            // Если тянем вверх и окно закрыто
            setIsExpanded(true);
            onExpandChange(true);
        } else if (diffY < -50 && isExpanded) {
            // Если тянем вниз и окно открыто
            setIsExpanded(false);
            onExpandChange(false);
        }
    };

    return (
        <div
            ref={panelRef}
            className={`info-slide-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="drag-bar" />

            <div className="content-modal">
                {isExpanded ? (
                    <div className="modal-inner-scrollable">
                        <div className="sticky-header">
                            <div className="post-content-horizontal">
                                <h1>{project.title}</h1>
                                <TagsList tags={profileData.tags} />
                            </div>
                        </div>

                        <TeamList />

                        <div className="section">
                            <h3>Подробное описание</h3>
                            <p>{project?.description}</p>
                        </div>

                        <div className="section">
                            <h3>Вакансии</h3>
                            <JobButton title="Senior Software Engineer" subtitle="2 years ago" />
                            <JobButton title="UI/UX Designer" subtitle="6 months ago" />
                            <JobButton title="Data Scientist" subtitle="1 year ago" />
                            <JobButton title="Digital Marketing Specialist" subtitle="3 months ago" />
                            <JobButton title="DevOps Engineer" subtitle="4 years ago" />
                        </div>
                    </div>
                ) : (
                    <div className={`modal-content-wrapper ${!isExpanded ? 'collapsed' : 'expanded'}`}>
                        <div className="description-text">{project?.description}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScrollToTop;