import React from 'react';
import { FaPen, FaExclamationCircle } from 'react-icons/fa';
import TELEGRAM_ID from '../../api/telegramId';

const StatusBlock = ({ statusShort, statusLong, isEditing, onEditStatus }) => {
    const draft = JSON.parse(localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`)) || {};

    const effectiveShort = draft.shortStatus ?? statusShort;
    const effectiveLong = draft.longStatus ?? statusLong;

    const hasDraftShort = draft.shortStatus && draft.shortStatus !== statusShort;
    const hasDraftLong = draft.longStatus && JSON.stringify(draft.longStatus) !== JSON.stringify(statusLong);

    const renderLongStatus = () => {
        if (typeof effectiveLong === 'string' && effectiveLong.trim()) {
            return (
                <p style={{ margin: 0, lineHeight: 1.5, color: '#222', fontSize: 14 }}>
                    {effectiveLong}
                </p>
            );
        }
        if (Array.isArray(effectiveLong) && effectiveLong.some(item => item?.trim())) {
            return effectiveLong.map((item, index) => (
                <p key={index} style={{ margin: 0, lineHeight: 1.5, color: '#222', fontSize: 14 }}>
                    • {item}
                </p>
            ));
        }
        return (
            <span className="about-placeholder" style={{ color: '#222', fontSize: 14 }}>
                Опишите подробнее, чем вы занимаетесь
            </span>
        );
    };

    return (
        <div className="status-block" style={{ padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    Статус {(hasDraftShort || hasDraftLong) && (
                        <FaExclamationCircle color="#e69900" title="Есть несохранённые черновики" />
                    )}
                </strong>
                {isEditing && (
                    <button className="edit-button" onClick={onEditStatus}>
                        <FaPen className="icon" />
                    </button>
                )}
            </div>

            <div className="status-content">
                {effectiveShort?.trim() && (
                    <div className="status-short" style={{ marginBottom: 8, marginLeft: 10 }}>
                        <span style={{ color: '#1976d2', fontSize: 14 }}>
                            {effectiveShort}
                        </span>
                    </div>
                )}
                <div className="long-status" style={{ padding: 10, fontSize: 14 }}>{renderLongStatus()}</div>
            </div>
        </div>
    );
};

export default StatusBlock;
