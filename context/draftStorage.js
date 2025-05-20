import TELEGRAM_ID from '../api/telegramId';

export const getDraftProfile = () => {
    const raw = localStorage.getItem(`pendingProfile_${TELEGRAM_ID}`);
    return raw ? JSON.parse(raw) : {};
};

export const saveDraftProfile = (key, value) => {
    const draft = getDraftProfile();
    draft[key] = value;
    localStorage.setItem(`pendingProfile_${TELEGRAM_ID}`, JSON.stringify(draft));
};

export const clearDraftProfile = () => {
    localStorage.removeItem(`pendingProfile_${TELEGRAM_ID}`);
};
