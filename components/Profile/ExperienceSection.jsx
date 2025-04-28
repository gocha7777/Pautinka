import React from 'react';
import { FaPen } from 'react-icons/fa';
const ExperienceSection = ({ experience, isEditing, onEditExperience }) => (
    <div className="experience">
        <strong className="section-title">Опыт</strong>
        <div className="experience-list">
            {experience.map((item, index) => (
                <div key={index} className="experience-item">
                    <img src="https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzLzJlOGI4YWJjLThjYzEtNGMwYi1hOTliLWMyNzg3NWE0OTk5NS5wbmc=" alt="company logo" className="company-icon" />
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