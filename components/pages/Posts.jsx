import React, { useState, useEffect } from 'react';
import '../../cssPages/SearchPage.scss';
import UserCard from '../User/UserCard';
import ProfileService from '../../api/Services/ProfileService';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [tags] = useState([
        'Дизайн презентаций',
        '3D - дизайн',
        'Графический дизайн',
        'Дизайн карточек для маркетплейсов',
        'Unit - экономика',
        'Golang',
    ]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!searchQuery.trim()) return;

            setLoading(true);

            try {
                const response = await ProfileService.searchUsers(searchQuery);
                setUsers(response || []);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [searchQuery]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchQuery(tag);
    };

    const handleCancelClick = () => {
        setSearchQuery('');
    };

    const filteredUsers = users.filter((user) => {
        console.log(user);

        const lower = searchQuery.toLowerCase();

        const inName = `${user.firstName} ${user.lastName} ${user.middleName}`.toLowerCase().includes(lower);
        const inStatus = (user.statusShort || '').toLowerCase().includes(lower);
        const inDescription = (user.description || '').toLowerCase().includes(lower);
        const inTags = (user.tags || []).some(tag => tag.toLowerCase().includes(lower));

        return inName || inStatus || inDescription || inTags;
    });

    const filteredTags = tags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

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
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : searchQuery.trim() === '' ? (
                        <p className="no-results">Начните вводить текст для поиска пользователей</p>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id} // 👈 обязательно
                                name={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
                                role={user.description || user.statusShort || 'Пользователь'}
                                photo={user.photoUrl || 'foto/users/Guy1.png'}
                                telegramId={user.telegramId}
                                replyButtonText="Написать"
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
