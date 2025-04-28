import React, { useState } from 'react';
import '../../cssPages/SearchPage.scss'; // Стили для страницы поиска

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tags] = useState([
        'Дизайн презентаций',
        '3D - дизайн',
        'Графический дизайн',
        'Дизайн карточек для маркетплейсов',
        'Unit - экономика',
        'Golang',
    ]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchQuery(tag); // Устанавливаем выбранный тег в поле поиска
    };

    const handleCancelClick = () => {
        setSearchQuery(''); // Сбрасываем поле поиска
    };

    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search-page-container">
            <div className="search-card">
                <header className="search-header">
                    <h1 className="logo">Паутинка</h1>
                </header>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Введите теги, имя или фамилию..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-input"
                    />
                    <button className="search-cancel-btn" onClick={handleCancelClick}>
                        Отмена
                    </button>
                </div>
                <div className="tags-container">
                    {filteredTags.map((tag, index) => (
                        <span
                            key={index}
                            className="tag"
                            onClick={() => handleTagClick(tag)} // Добавляем логику для клика
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;