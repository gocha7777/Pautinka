import React, { useEffect, useState } from 'react';
import ProfileService from '../../api/Services/ProfileService';

const StatsRow = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        ProfileService.getProfile().then(profile => {
            setStats(profile.stats || {});
        });
    }, []);

    return (
        <div className="stats-row">
            {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="stat-box">
                    <p className="label">
                        {key === 'followers' ? 'подписчики' : 'подписки'}
                    </p>
                    <h3 className="value">{value}</h3>
                </div>
            ))}
        </div>
    );
};

export default StatsRow;