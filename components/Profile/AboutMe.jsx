import React from 'react';
import { FaPen } from 'react-icons/fa';

const AboutMe = ({ description, isEditing, onEditAboutMe }) => (
    <div className="about-me">
        {isEditing && (
            <button className="edit-button" onClick={onEditAboutMe}>
                <FaPen className="icon" />
            </button>
        )}
        <strong>Обо мне</strong>
        <div className="description">
            {description}
        </div>
    </div>
);

export default AboutMe;