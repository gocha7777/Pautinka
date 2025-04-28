import React from 'react';

const TagsList = ({ tags, isEditing, onAddTag }) => (
    <div className="tags-list">
        {tags.map((tag, index) => (
            <div key={index} className="tag">
                <span>{tag}</span>
            </div>
        ))}
        {isEditing && (
            <button className="add-tag" onClick={onAddTag}>+</button>
        )}
    </div>
);

export default TagsList;