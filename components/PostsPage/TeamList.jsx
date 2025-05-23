import React from 'react';
import '../../cssPages/Posts.scss';

const teamMembers = [
    {
        name: 'Анна Шатрова',
        role: 'Ивент-менеджер',
        image: 'foto/players/image 7.png',
    },
    {
        name: 'Максим Козин',
        role: 'Маркетолог',
        image: 'foto/players/image 8.png',
    },
    {
        name: 'Ксения Минская',
        role: 'Креативный директор',
        image: 'foto/players/image 9.png',
    },
];

const TeamList = () => {
    return (
        <div className="block-participants">
            <div className="header">
                <h3>Наша команда</h3>
            </div>
            <div className="team-list">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <img src={member.image} alt={member.name} />
                        <div className="member-info">
                            <strong>{member.name}</strong>
                            <span>{member.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default TeamList;
