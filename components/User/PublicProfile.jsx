import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AvatarSection from '../Profile/AvatarSection';
import StatsRow from '../Profile/StatsRow';
import TagsList from '../Profile/TagsList';
import StatusBlock from '../Profile/StatusBlock';
import AboutMe from '../Profile/AboutMe';
import InfoField from '../Profile/InfoField';
import ScrollableExperienceCards from '../Profile/ScrollableExperienceCards';
import ProfileService from '../../api/Services/ProfileService';
import '../../cssPages/SearchPage.scss';
import { p } from 'framer-motion/client';

const calculateTotalExperience = (experiences) => {
    let totalMonths = 0;

    for (const exp of experiences || []) {
        if (!exp.startDate || !exp.endDate) continue;

        const start = new Date(exp.startDate);
        const end = new Date(exp.endDate);

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        if (months > 0) totalMonths += months;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0 && months === 0) return 'меньше месяца';
    return `${years ? `${years} ${years === 1 ? 'год' : 'года'}` : ''}${years && months ? ' ' : ''}${months ? `${months} мес.` : ''}`;
};

const PublicProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(profile);
    
    useEffect(() => {
        ProfileService.getUserById(id)
            .then(setProfile)
            .catch(err => console.error('Ошибка при загрузке профиля:', err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!profile) return <div>Профиль не найден</div>;

    const experienceTransformed = (profile.experiences || []).map((exp) => ({
        src: exp.companyLogo || `https://logo.clearbit.com/${exp.company?.toLowerCase()}.com`,
        company: exp.company || 'Компания',
        position: exp.role || 'Должность',
        duration: exp.startDate && exp.endDate
            ? `${new Date(exp.startDate).toLocaleDateString('ru-RU', { month: '2-digit', year: '2-digit' })} - ${new Date(exp.endDate).toLocaleDateString('ru-RU', { month: '2-digit', year: '2-digit' })}`
            : 'Дата не указана',
    }));

    return (
        <div className="profile-container">
            <div className="profile-card">

                <button onClick={() => window.history.back()} className="back-to-profile-button">
                    <h3> ← Редактирование профиля</h3>
                </button>

                <AvatarSection avatarUrl={profile.photoUrl || '/foto/foto-profile.png'} name={`${profile.firstName} ${profile.lastName}`} />

                <StatusBlock statusShort={profile.statusShort || ''} statusLong={profile.statusLong || []} />

                <div className="moderation-button-container">
                    <button className="moderation-button" onClick={() => navigate(`/user/${id}/links`)}>
                        Написать
                    </button>
                </div>

                <StatsRow stats={profile.stats || {}} />

                <TagsList tags={(profile.tags || []).map(tag => ({ tagName: tag }))} />

                <InfoField
                    fields={['ВУЗ', 'Курс']}
                    data={[profile.university || '', profile.course || '']}
                    className="info-right flex"
                />

                <AboutMe description={profile.description || ''} />

                <ScrollableExperienceCards
                    experience={experienceTransformed}
                    totalExperience={calculateTotalExperience(profile.experiences || [])}
                />
            </div>
        </div>
    );
};

export default PublicProfile;
