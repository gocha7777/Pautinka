import React from 'react';
import { FaPen } from 'react-icons/fa';

const StatusBlock = ({ statusShort, statusLong, isEditing, onEditStatus }) => (
    <div className="status-block">
        {isEditing && (
            <button className="edit-button" onClick={onEditStatus}>
                <FaPen className="icon" />
            </button>
        )}
        <strong>статус • {statusShort}</strong>
        <div className="long-status">
            {statusLong.map((item, index) => (
                <p key={index}>• {item}.</p>
            ))}
        </div>
    </div>
);

export default StatusBlock;