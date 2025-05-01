import React, { useState } from 'react';
import '../../cssPages/Styles.scss';

import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import AvatarSection from '../Profile/AvatarSection';
import StatsRow from '../Profile/StatsRow';
import BlogBox from '../Profile/BlogBox';
import TagsList from '../Profile/TagsList';
import StatusBlock from '../Profile/StatusBlock';
import AboutMe from '../Profile/AboutMe';
import LinksSection from '../Profile/LinksSection';
import ExperienceSection from '../Profile/ExperienceSection';
import InfoField from '../Profile/InfoField';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    // const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const { profileData } = useProfile();

    return (
        <div className={`profile-container`}>
            <div className="profile-card">

                <AvatarSection avatarUrl="foto\foto-profile.png" />

                <button className="toggle-edit" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Сохранить' : 'Редактировать профиль'}
                </button>

                <StatsRow stats={profileData.stats} />

                <div className="info-grid">
                    <div className="info-row">
                        <InfoField
                            fields={['Имя', 'Фамилия', 'Отчество', 'Телефон', 'Почта']}
                            data={[
                                profileData.infoFields['Имя'],
                                profileData.infoFields['Фамилия'],
                                profileData.infoFields['Отчество'],
                                profileData.infoFields['Телефон'],
                                profileData.infoFields['Почта'],
                            ]}
                            className="info-left"
                        />
                        <div className="blogbox-container">
                            <InfoField
                                fields={['ВУЗ', 'Дата рождения', 'Курс']}
                                data={[
                                    profileData.infoFields['ВУЗ'],
                                    profileData.infoFields['Дата рождения'],
                                    profileData.infoFields['Курс'],
                                ]}
                                className="info-right"
                            ></InfoField>
                            <BlogBox />
                        </div>
                    </div>
                </div>

                <TagsList
                    tags={profileData.tags}
                    isEditing={isEditing}
                    onAddTag={() => navigate('/profile/add-tag')}
                />

                <StatusBlock
                    statusShort={profileData.statusShort}
                    statusLong={profileData.statusLong}
                    isEditing={isEditing}
                    onEditStatus={() => navigate('/profile/edit-status')}
                />

                <div className="profile-sections-layout">
                    <div className="profile-sections-right">
                        <AboutMe
                            description={profileData.description}
                            isEditing={isEditing}
                            onEditAboutMe={() => navigate('/profile/edit-about-me')}
                        />
                    </div>
                    <div className="profile-sections-left">
                        <LinksSection
                            links={profileData.links}
                            isEditing={isEditing}
                            onEditLinks={() => navigate('/profile/edit-links')}
                        />
                        <ExperienceSection
                            experience={profileData.experience}
                            isEditing={isEditing}
                            onEditExperience={() => navigate('/profile/edit-experience')}
                        />
                    </div>

                </div>

                <div className="moderation-button-container">
                    <button
                        className="moderation-button"
                        onClick={() => navigate('/profile/moderation')}
                    >
                        Отправить на модерацию
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
