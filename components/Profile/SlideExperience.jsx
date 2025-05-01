import React from 'react';
import PropTypes from 'prop-types';

const ScrollableExperienceCards = ({ experience, totalExperience }) => {
    return (
        <div className="scrollable-experience">
            <h2 className="total-experience">Опыт работы: {totalExperience}</h2>
            <div className="experience-cards-wrapper">
                <div className="experience-cards">
                    {experience.map((item, index) => (
                        <div key={index} className="experience-card">
                            <img src={item.src} alt={`${item.company} logo`} className="company-logo" />
                            <div className="card-details">
                                <strong className="company-name">{item.company}</strong>
                                <p className="position">{item.position}</p>
                                <span className="duration">{item.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

ScrollableExperienceCards.propTypes = {
    experience: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired,
            position: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
        })
    ).isRequired,
    totalExperience: PropTypes.string.isRequired,
};

export default ScrollableExperienceCards;