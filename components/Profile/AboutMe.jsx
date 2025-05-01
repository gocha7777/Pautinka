import React from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';

const AboutMe = ({ description, isEditing, onEditAboutMe }) => {
    // Обработка текста: сохранение исходного форматирования
    const renderDescription = (text) => {
        return text.split('\n').map((line, index) => {
            // Если строка содержит ссылку, делаем её кликабельной
            if (line.trim().startsWith('http')) {
                return (
                    <p key={index}>
                        <a href={line.trim()} target="_blank" rel="noopener noreferrer">
                            {line.trim()}
                        </a>
                    </p>
                );
            }
            // Если строка пустая, возвращаем пустой параграф для сохранения отступов
            if (line.trim() === '') {
                return <p key={index}>&nbsp;</p>;
            }
            // Для обычного текста возвращаем параграф
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div className="about-me">
            {isEditing && (
                <button className="edit-button" onClick={onEditAboutMe}>
                    <FaPen className="icon" />
                </button>
            )}
            <strong className="about-me-title">Обо мне</strong>
            <div className="description">{renderDescription(description)}</div>
        </div>
    );
};

AboutMe.propTypes = {
    description: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    onEditAboutMe: PropTypes.func.isRequired,
};

AboutMe.defaultProps = {
    isEditing: false,
};

export default AboutMe;