import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TagsList from '../Profile/TagsList';
import { useProfile } from '../../context/ProfileContext';
import '../../cssPages/Posts.scss';
import TeamList from '../PostsPage/TeamList';
import JobButton from '../PostsPage/JobButton';
import { useNavigate } from 'react-router-dom';

const ScrollToTop = ({ project, onExpandChange }) => {
    const panelRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { profileData } = useProfile();
    const navigate = useNavigate();

    const handleDragEnd = (event, info) => {
        const offset = info.offset.y;

        if (!isExpanded && offset < -100) {
            setIsExpanded(true);
            onExpandChange(true);
        } else if (isExpanded && offset > 100) {
            setIsExpanded(false);
            onExpandChange(false);
        }
    };

    return (
        <motion.div
            ref={panelRef}
            className="info-slide-panel"
            initial={false}
            animate={{ y: isExpanded ? 0 : '80%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
        >
            <div className="drag-bar" />

            <div className="content">
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
                            <JobButton
                                title="Junior product manager"
                                subtitle="go 1 ago"
                            />
                            <JobButton
                                title="Junior product manager"
                                subtitle="go 1 ago"
                            />
                            <JobButton
                                title="Junior product manager"
                                subtitle="go 1 ago"
                            />
                        </div>
                    </div>
                ) : (
                    <div className={`modal-content-wrapper ${!isExpanded ? 'collapsed' : 'expanded'}`}>
                        <div className="description-text">
                            {project?.description}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ScrollToTop;
