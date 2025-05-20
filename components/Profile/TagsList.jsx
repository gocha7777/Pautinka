import React from 'react';
import { FaPen, FaExclamationCircle } from 'react-icons/fa';

const TagsList = ({ tags = [], isEditing, onAddTag }) => {
    return (
        <div className="tags-list tags-list-user">
            {tags.length === 0 && (
                <div className="tag tag-placeholder" style={{ color: '#888' }}>
                    <span onClick={onAddTag}>Добавьте тег</span>
                </div>
            )}
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    <span>{tag.tagName}</span>
                    {tag.isDraft && (
                        <FaExclamationCircle
                            title="Это черновик, ожидающий модерации"
                            style={{ color: '#e69900', marginLeft: 4 }}
                        />
                    )}
                </div>
            ))}
            {isEditing && (
                <button className="add-tag" onClick={onAddTag}>+</button>
            )}
        </div>
    );
};

export default TagsList;
