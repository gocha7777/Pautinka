import React, { useState, useEffect } from 'react';

const fieldMap = {
    'Имя': 'firstName',
    'Фамилия': 'lastName',
    'Отчество': 'middleName',
    'Телефон': 'phone',
    'Почта': 'email',
    'ВУЗ': 'university',
    'Курс': 'course',
    'Направление': 'major',
};

const validators = {
    'Имя': val => /^[А-Яа-яA-Za-zёЁ\s-]+$/.test(val),
    'Фамилия': val => /^[А-Яа-яA-Za-zёЁ\s-]+$/.test(val),
    'Отчество': val => /^[А-Яа-яA-Za-zёЁ\s-]*$/.test(val),
    'Телефон': val => /^[\d\s()+-]*$/.test(val),
    'Почта': val => /^[^\s@]+@[^\s@]*$/.test(val),
    'ВУЗ': val => val.length <= 100,
    'Курс': val => /^\d{0,2}$/.test(val),
    'Направление': val => val.length <= 100,
};

const InfoField = ({ fields, className, isEditing, profile = {}, data = [], onChange }) => {
    const [editedValues, setEditedValues] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const initialValues = {};

        fields.forEach((field, index) => {
            const key = fieldMap[field];
            let value = '';
            if (profile && key in profile) value = profile[key];
            else if (data[index]) value = data[index];
            initialValues[field] = value || '';
        });

        const isSame = Object.entries(initialValues).every(
            ([key, val]) => editedValues[key] === val
        );

        if (!isSame) {
            setEditedValues(initialValues);
        }
    }, [fields, profile, data]);

    const handleChange = (field, value) => {
        const key = fieldMap[field];
        setEditedValues(prev => ({ ...prev, [field]: value }));

        if (field === 'Курс') {
            const num = parseInt(value, 10);
            const isValid = value === '' || (!isNaN(num) && num >= 1 && num <= 10);
            setErrors(prev => ({
                ...prev,
                [field]: isValid ? undefined : 'Курс должен быть числом от 1 до 10',
            }));
        } else if (validators[field] && value !== '' && !validators[field](value)) {
            setErrors(prev => ({
                ...prev,
                [field]: 'Неверный формат',
            }));
        } else {
            setErrors(prev => {
                const newErr = { ...prev };
                delete newErr[field];
                return newErr;
            });
        }

        if (onChange) {
            onChange(key, value);
        }
    };

    return (
        <div className={className}>
            {fields.map((field, index) => (
                <div key={index} className="info-box">
                    <label>{field}</label>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedValues[field] || ''}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className={errors[field] ? 'input-error' : ''}
                            />
                            {errors[field] && (
                                <span className="error-message">{errors[field]}</span>
                            )}
                        </>
                    ) : (
                        <span>{editedValues[field] || ''}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InfoField;
