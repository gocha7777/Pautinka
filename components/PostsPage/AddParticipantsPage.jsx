import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../api/Services/ProfileService';
import '../../cssPages/Posts.scss'; // Подключи свои стили

const AddParticipantsPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    // Загружаем выбранных участников из localStorage при заходе
    useEffect(() => {
        const stored = localStorage.getItem('pendingParticipants');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setSelected(parsed);
                }
            } catch (err) {
                console.warn("Ошибка при парсинге участников:", err);
            }
        }
    }, []);

    // Поиск по введённому запросу
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim()) {
                ProfileService.searchUsers(query)
                    .then(setResults)
                    .catch((err) => {
                        console.error('Ошибка при поиске пользователей:', err);
                        setResults([]);
                    });
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // Добавить или удалить участника
    const toggleSelect = (user) => {
        const exists = selected.find(p => p.id === user.id);
        if (exists) {
            setSelected(selected.filter(p => p.id !== user.id));
        } else {
            setSelected([
                ...selected,
                {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    telegramId: user.telegramId || null,  // Используем только одно поле telegramId
                    photo: user.photoUrl || 'default_photo.png'
                }
            ]);
        }
    };




    // Подтвердить выбор и вернуться
    const handleDone = () => {
        // Сохраняем выбранных участников в localStorage с их id
        localStorage.setItem('pendingParticipants', JSON.stringify(selected));
        console.log("Сохраняем участников в localStorage:", selected);
        navigate(-1);
    };


    return (
        <div className="search-page-container">
            <div className="search-card">
                <header className="search-header">
                    <h1 className="logo">Выбор участников</h1>
                </header>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Введите имя, фамилию или тег..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-cancel-btn" onClick={() => setQuery('')}>
                        Очистить
                    </button>
                </div>

                <div className="users-container">
                    {results.length === 0 && query.trim() === '' && (
                        <p className="no-results">Начните вводить текст для поиска пользователей</p>
                    )}

                    {results.map((user) => {
                        const isSelected = selected.some(p => p.id === user.id);
                        return (
                            <div
                                key={user.id}
                                className={`user-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleSelect(user)}
                            >
                                <img
                                    src={user.photoUrl || 'foto/users/Guy1.png'} // если фото пользователя есть, то использовать его
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="user-photo"
                                />
                                <div>
                                    {user.firstName} {user.lastName} — {user.statusShort}
                                    {isSelected && <span style={{ marginLeft: '10px' }}>✅</span>}
                                </div>
                            </div>
                        );
                    })}

                    {results.length === 0 && query.trim() !== '' && (
                        <p className="no-results">Пользователи не найдены</p>
                    )}
                </div>

                <button className="submit-button" onClick={handleDone}>
                    Готово ({selected.length})
                </button>
            </div>
        </div>
    );
};

export default AddParticipantsPage;
