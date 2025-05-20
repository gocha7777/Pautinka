import React from 'react';
import { FaPen, FaExclamationCircle } from 'react-icons/fa';

const LinksSection = ({ links = [], isEditing, onEditLinks }) => {
    const getIconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            return 'https://via.placeholder.com/32';
        }
    };

    return (
        <div className="links-section">
            <strong className="section-title">Ссылки</strong>
            <div className="link-buttons-container">
                {links.filter(link => !!link.url).length === 0 ? (

                    <div className="links-placeholder">
                        <span className="about-placeholder">
                            Добавьте ссылки на ваши соцсети, портфолио или другие ресурсы
                        </span>
                        {isEditing && (
                            <button className="edit-button" onClick={onEditLinks}>
                                <FaPen className="icon" />
                            </button>
                        )}
                    </div>
                ) : (
                    links.map((link, index) => (
                        <div
                            key={index}
                            className="link-button-wrapper"
                            style={{
                                backgroundColor: link.isDraft ? 'rgba(255,165,0,0.1)' : 'transparent',
                                borderLeft: link.isDraft ? '4px solid orange' : 'none',
                                paddingLeft: link.isDraft ? '8px' : undefined,
                            }}
                        >
                            <a
                                href={link.url}
                                className="link-button-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={getIconUrl(link.url)}
                                    alt={link.type || 'иконка'}
                                    className="link-icon"
                                />
                                {(link.type || link.name)?.slice(0, 10)}
                                {(link.type || link.name)?.length > 10 && '…'}
                                {link.isDraft && (
                                    <FaExclamationCircle
                                        title="Это черновик, ожидающий модерации"
                                        style={{ color: '#e69900', marginLeft: 4 }}
                                    />
                                )}
                            </a>

                        </div>
                    ))
                )}
            </div>
            {isEditing && links.length > 0 && (
                <button className="edit-button" onClick={onEditLinks}>
                    <FaPen className="icon" />
                </button>
            )}
        </div>
    );
};

export default LinksSection;
