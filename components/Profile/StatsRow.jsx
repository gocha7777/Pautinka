import React from 'react';

const StatsRow = ({ stats }) => (
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

export default StatsRow;