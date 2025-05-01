import React from 'react';
import { FaPen } from 'react-icons/fa';
const ExperienceSection = ({ experience, isEditing, onEditExperience }) => (
    <div className="experience">
        <strong className="section-title">Опыт</strong>
        <div className="experience-list">
            {experience.map((item, index) => (
                <div key={index} className="experience-item">
                    <img src={item.src} alt="company logo" className="company-icon" />
                    <div className="experience-details">
                        <strong>{item.company}</strong>
                        <p>{item.position}</p>
                        <span>{item.duration}</span>
                    </div>
                </div>
            ))}
        </div>
        {isEditing && (
            <button className="edit-button" onClick={onEditExperience}>
                <FaPen className="icon" />
            </button>
        )}
    </div>
);

export default ExperienceSection;