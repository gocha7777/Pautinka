import React, { useState } from 'react';
import '../../cssPages/SearchPage.scss'; // Стили для страницы поиска
import UserCard from '../User/UserCard'; // Импортируем компонент UserCard

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

    // Данные пользователей
    const [users] = useState([
        {
            id: 1,
            name: 'Иван Иванов',
            tags: ['Дизайн презентаций', 'Графический дизайн'],
            photo: 'foto/users/Guy1.png',
            description: 'Специалист по созданию презентаций и графическому дизайну.',
        },
        {
            id: 2,
            name: 'Мария Смирнова',
            tags: ['3D - дизайн', 'Golang'],
            photo: 'foto/users/Woman 4.png',
            description: '3D-дизайнер и разработчик на Golang.',
        },
        {
            id: 3,
            name: 'Сергей Петров',
            tags: ['Unit - экономика', 'Дизайн карточек для маркетплейсов'],
            photo: 'foto/users/Guy 2.png',
            description: 'Экономист и дизайнер маркетинговых карточек.',
        },
        {
            id: 4,
            name: 'Ольга Кузнецова',
            tags: ['UI/UX дизайн', 'Figma', 'Photoshop'],
            photo: 'foto/users/Woman 2.png',
            description: 'Профессионал в области UI/UX дизайна с опытом использования Figma и Photoshop.',
        },
        {
            id: 5,
            name: 'Дмитрий Соколов',
            tags: ['Frontend', 'React', 'JavaScript'],
            photo: 'foto/users/Guy 2.png',
            description: 'Frontend-разработчик с опытом работы на React и JavaScript.',
        },
        {
            id: 6,
            name: 'Екатерина Ковалева',
            tags: ['Backend', 'Node.js', 'API'],
            photo: 'foto/users/Woman 4.png',
            description: 'Опытный backend-разработчик, специализирующийся на Node.js и API.',
        },
        {
            id: 7,
            name: 'Андрей Васильев',
            tags: ['DevOps', 'Kubernetes', 'Docker'],
            photo: 'foto/users/Guy1.png',
            description: 'DevOps-инженер с глубокими знаниями Kubernetes и Docker.',
        },
        {
            id: 8,
            name: 'Ирина Михайлова',
            tags: ['Data Science', 'Python', 'Machine Learning'],
            photo: 'foto/users/Woman 4.png',
            description: 'Специалист в области анализа данных и машинного обучения.',
        },
        {
            id: 9,
            name: 'Сергей Николаев',
            tags: ['Java', 'Spring Boot', 'Microservices'],
            photo: 'foto/users/Guy1.png',
            description: 'Java-разработчик с опытом работы в микросервисной архитектуре.',
        },
        {
            id: 10,
            name: 'Анна Белова',
            tags: ['SEO', 'Digital Marketing', 'Content Writing'],
            photo: 'foto/users/Woman 2.png',
            description: 'Специалист по цифровому маркетингу и SEO.',
        },
        {
            id: 11,
            name: 'Владимир Чернов',
            tags: ['Blockchain', 'Solidity', 'Ethereum'],
            photo: 'foto/users/Guy 4.png',
            description: 'Блокчейн-разработчик с опытом написания смарт-контрактов на Solidity.',
        },
        {
            id: 12,
            name: 'Степан Григорьев',
            tags: ['Mobile Development', 'Flutter', 'Dart'],
            photo: 'foto/users/Guy 4.png',
            description: 'Разработчик мобильных приложений с использованием Flutter.',
        },
    ]);

    // Обработчики событий
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchQuery(tag); // Устанавливаем выбранный тег в поле поиска
    };

    const handleCancelClick = () => {
        setSearchQuery(''); // Сбрасываем поле поиска
    };

    // Фильтрация пользователей по запросу
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Фильтрация тегов
    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search-page-container">
            <div className="search-card">
                <header className="search-header">
                    <img src="foto/icon-pautinka.png" className="icon" alt="Паутинка" />
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
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="users-container">
                    {searchQuery.trim() === '' ? (
                        <p className="no-results">Начните вводить текст для поиска пользователей</p>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                name={user.name}
                                role={user.description} // Передаем описание в роль
                                photo={user.photo}
                            />
                        ))
                    ) : (
                        <p className="no-results">Пользователи не найдены</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;