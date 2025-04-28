import React from 'react';
import { FaPen } from 'react-icons/fa';

const LinksSection = ({ links, isEditing, onEditLinks }) => {
    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            return 'https://via.placeholder.com/32'; // Default placeholder if URL is invalid
        }
    };

    return (
        <div className="links-section">
            <strong className="section-title">Ссылки</strong>
            <div className="link-buttons-container">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        className="link-button-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={getIconUrl(link.url) || link.icon}
                            alt={link.name}
                            className="link-icon"
                        />
                        {link.name}
                    </a>
                ))}
            </div>
            {isEditing && (
                <button className="edit-button" onClick={onEditLinks}>
                    <FaPen className="icon" />
                </button>
            )}
        </div>
    );
};

export default LinksSection;