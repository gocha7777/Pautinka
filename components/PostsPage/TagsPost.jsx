import React from 'react';

const TagsPost = ({ tags = [] }) => {
    // Фильтруем пустые теги
    const filteredTags = tags.filter(tag => typeof tag === 'string' && tag.trim() !== '');

    // Если нет валидных тегов — ничего не отображаем
    if (filteredTags.length === 0) {
        return null;
    }

    return (
        <div className="tags-list tags-list-user">
            {filteredTags.map((tag, index) => (
                <div key={index} className="tag">
                    <span>{tag}</span>
                </div>
            ))}
        </div>
    );
};

export default TagsPost;
