import { FaPen, FaExclamationCircle } from 'react-icons/fa';
import { getDraftProfile } from '../../context/draftStorage';

const AboutMe = ({ description, isEditing, onEditAboutMe }) => {
    const draft = getDraftProfile();
    const hasDraft = draft && draft.hasOwnProperty('description');

    const renderDescription = (text) => {
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('http')) {
                return (
                    <p key={index}>
                        <a href={line.trim()} target="_blank" rel="noopener noreferrer">
                            {line.trim()}
                        </a>
                    </p>
                );
            }
            if (line.trim() === '') {
                return <p key={index}>&nbsp;</p>;
            }
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
            <strong className="about-me-title">
                Обо мне{' '}
                {hasDraft && (
                    <FaExclamationCircle
                        title="Это черновик, ожидающий модерации"
                        style={{ color: '#e69900', marginLeft: 4 }}
                    />
                )}
            </strong>
            <div className="description">
                {description && description.trim() !== ''
                    ? renderDescription(description)
                    : <span className="about-placeholder">Расскажите о себе: образование, опыт, интересы, достижения...</span>
                }
            </div>
        </div>
    );
};

export default AboutMe;