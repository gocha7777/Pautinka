import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        name: 'Egorova Elizaveta',
        description: 'Руководитель направления обучения в СБЕР «Деловая среда». Карьерный консультант, психолог. Спикер в Бетеон HRTech',
        tags: ['HR', 'карьера', 'SBER', 'консалтинг'],
        availableTags: ['HR', 'карьера', 'SBER', 'консалтинг', 'маркетинг', 'аналитика', 'дизайн', 'frontend', 'backend'],
        links: [
            { id: 1, name: 'Telegram', url: '#' },
            { id: 2, name: 'Instagram', url: '#' },
            { id: 3, name: 'LinkedIn', url: '#' }
        ],
        experience: [
            { id: 1, company: 'VK', position: 'Маркетолог',startDate: '2022', endDate: '2023' },
            { id: 2, company: 'tbank', position: 'СММ Менеджер',startDate: '2020', endDate: '2021' }
        ],
        duration: '2 года',
        stats: { followers: '24', subscriptions: '24' },
        infoFields: {
            Имя: 'Elizaveta',
            Фамилия: 'Egorova',
            Отчество: 'Alexeevna',
            Телефон: '+7 (705) 406 73 04',
            Почта: 'dnossova@gmail.com',
            ВУЗ: 'НИУ ВШЭ',
            'Дата рождения': '11.06.2005',
            Курс: '2 курс (бак)'
        },
        statusShort: 'провожу кейс чемпионаты',
        statusLong: ['Карьерные треки для соискателей', 'HR-консалтинг для компаний'],
    });

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
