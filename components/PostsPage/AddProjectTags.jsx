import React, { useEffect, useState } from 'react';
import ProfileService from '../../api/Services/ProfileService';
import { FiSearch } from 'react-icons/fi';

const MAX_VISIBLE = 4;

const AddProjectTags = ({ tags, setTags }) => {
    const [availableTags, setAvailableTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await ProfileService.getAllAvailableTags(); // [{ tagName, category }]
                const allAvailable = res.map(t => ({ tagName: t.tagName }));
                const selectedTagNames = new Set(tags);
                const filteredAvailable = allAvailable.filter(t => !selectedTagNames.has(t.tagName));
                setAvailableTags(filteredAvailable);
            } catch (err) {
                console.error("Ошибка при получении тегов:", err);
            }
        };

        fetchTags();
    }, [tags]);

    const handleTagAdd = (tagObj) => {
        if (!tags.includes(tagObj.tagName)) {
            setTags(prev => [...prev, tagObj.tagName]);
            setAvailableTags(prev => prev.filter(t => t.tagName !== tagObj.tagName));
        }
    };

    const handleTagRemove = (tagName) => {
        setTags(prev => prev.filter(t => t !== tagName));
        setAvailableTags(prev => [...prev, { tagName }]);
    };

    const filteredTags = searchTerm
        ? availableTags.filter(tag =>
            tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : availableTags.slice(0, MAX_VISIBLE);

    const visibleUserTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE);

    return (
        <div className="tags-block-container">

            {/* Добавленные теги */}
            <div className="tags-list">
                {visibleUserTags.map((tag, index) => (
                    <div key={index} className="tag">
                        <span>{tag}</span>
                        <button
                            onClick={() => handleTagRemove(tag)}
                            className="remove-tag"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {tags.length > MAX_VISIBLE && (
                    <div
                        className="show-more-tags"
                        onClick={() => setShowAllTags(prev => !prev)}
                    >
                        {showAllTags ? 'Скрыть теги' : 'Показать все теги'}
                    </div>
                )}
            </div>

            {/* Доступные для добавления теги */}
            <div className="search-block">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Начните вводить метку"
                        className="search-tag-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-icon">
                        <FiSearch size={18} />
                    </button>
                </div>

                <div className="available-tags-list">
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tagObj, index) => (
                            <div
                                key={index}
                                className="available-tag"
                                onClick={() => handleTagAdd(tagObj)}
                            >
                                {tagObj.tagName}
                            </div>
                        ))
                    ) : (
                        <div className="no-tags-found">Теги не найдены</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProjectTags;
