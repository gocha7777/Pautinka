import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        name: 'Egorova Elizaveta',
        description: 'Руководитель направления обучения в СБЕР «Деловая среда». Карьерный консультант, психолог. Спикер в EdTech HRTech. Найти работу можно тут: https://set.ki/community /kco4mJW Автор тг-канала «Поединок с HRom»: https: //t.me/hrforfight ИИ-энтузиаст, основатель бизнес-клуба Team Al и Al- акселератора. Cofounder "Enigma" - онлайн-курсы по ИИ для сотрудников и руководителей.  https://aienigma.ru',
        descriptionuser: `Руководитель направления обучения в СБЕР «Деловая среда».
                Карьерный консультант, психолог. Спикер в EdTech HRTech.
                Найти работу можно тут: https://set.ki/community /kco4mJW
                Автор тг-канала «Поединок с HRom»:
                https: //t.me/hrforfight
                ИИ-энтузиаст, основатель бизнес-клуба Team Al и Al- акселератора.
                Cofounder "Enigma" - онлайн-курсы по ИИ для сотрудников и руководителей. 
                https://aienigma.ru
                Al-платформа. Активировать Софи (Al) (введите мой промокод @anastasalex): 
                https: //t.me/sofi_t_bot?start=l anastasalex
                Сотрудничество: пишите в телеграм @anastasalex
                По каким вопросам можно обратиться?
                1) Карьерная консультация
                2) Выступление на форуме/конференции
                3) Корпоративное обучение
                где нахожусь
                г. Москва`,
        tags: ['HR', 'карьера', 'SBER', 'консалтинг'],
        availableTags: ['HR', 'карьера', 'SBER', 'консалтинг', 'маркетинг', 'аналитика', 'дизайн', 'frontend', 'backend'],
        links: [
            { id: 1, name: 'Telegram', url: 'https://web.telegram.org/k/' },
            { id: 2, name: 'Instagram', url: 'https://www.instagram.com' },
            { id: 3, name: 'LinkedIn', url: 'https://ru.linkedin.com' }
        ],
        experience: [
            { id: 1, company: 'VK', position: 'Маркетолог', startDate: '2022', endDate: '2023', src: "https://cdn-icons-png.flaticon.com/128/2504/2504953.png" },
            { id: 2, company: 'tbank', position: 'СММ Менеджер', startDate: '2020', endDate: '2021', src: "https://cdn.tbank.ru/static/pfa-multimedia/images/ae288629-59d7-4eb6-b074-8bb0549a43b6.svg" }
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
