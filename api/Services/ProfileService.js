import axiosRepository from "../axiosRepository";
import TELEGRAM_ID from "../telegramId";

const getProfileByTelegramId = async (telegramId) => {
    console.log(telegramId + " this id");

    const response = await axiosRepository.get(`api/User/get-user-by-telegram/${telegramId}`);
    return response.data;
};

const getOrCreateUser = async (payload) => {
    const response = await axiosRepository.post("api/User/get-or-create", payload);
    return response.data;
};
const getUserById = async (id) => {
    const response = await axiosRepository.get(`api/User/${id}`);
    return response.data;
};

const updateUser = async (id, user) => {
    const response = await axiosRepository.put(`api/User/${id}`, user);
    return response.data;
};

const updateUserDescriptionByTelegramId = async (telegramId, description) => {
    return axiosRepository.patch(
        `api/User/update-description/${telegramId}`,
        { description }, // просто строка!
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
};

const getAllAvailableTags = async () => {
    const response = await axiosRepository.get('api/User/tags');
    return response.data;
};

// Обновление тегов по Telegram ID
const updateUserTagsByTelegramId = async (telegramId, tags) => {
    const tagNames = tags.map(tag => typeof tag === 'string' ? tag : tag.tagName); // ✅ корректно обрабатывает оба случая

    console.log("👉 Обновляем теги:", tagNames); // debug

    return axiosRepository.patch(
        `api/User/update-tags/${telegramId}`,
        tagNames,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
};




// Обновление статуса по Telegram ID
const updateUserStatusByTelegramId = async (telegramId, shortStatus, longStatusRaw) => {
    const longStatus = Array.isArray(longStatusRaw)
        ? longStatusRaw
        : longStatusRaw.split(',').map(s => s.trim());
    console.log("Отправляется shortStatus:", shortStatus);
    console.log("Отправляется longStatus:", longStatus);


    return axiosRepository.patch(
        `api/User/update-status/${telegramId}`,
        {
            shortStatus,
            longStatus
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
};





// Обновление ссылок по Telegram ID
const updateUserLinksByTelegramId = async (telegramId, links) => {
    console.log('Обновление ссылок:', links);

    return axiosRepository.patch(
        `api/User/update-links/${telegramId}`,
        links, // отправляем массив напрямую!
        { headers: { 'Content-Type': 'application/json' } }
    );
};

// Обновление опыта работы по Telegram ID
const updateUserExperienceByTelegramId = async (telegramId, experience) => {
    console.log(experience);

    return axiosRepository.patch(
        `api/User/update-experiences/${telegramId}`,
        experience,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
};
// В ProfileService.js
const updateUserProfileByTelegramId = async (telegramId, profileData) => {
    console.log(profileData);
    return axiosRepository.patch(
        `api/User/update-profile/${telegramId}`,
        profileData,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
};



// Добавляем функцию getProfile для совместимости
const getProfile = async () => {
    // Здесь можно реализовать получение профиля текущего пользователя
    // Например, получить Telegram ID из localStorage или другого источника
    const telegramId = TELEGRAM_ID || localStorage.getItem('telegramId');
    if (!telegramId) throw new Error('Telegram ID not found');
    return getProfileByTelegramId(telegramId);
};


const sendToModeration = async (payload) => {
    console.log(payload);

    const response = await axiosRepository.post(
        `/api/User/send-to-moderation`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );
    return response.data;
};

// const submitForModeration = async (payload) => {
//     return axiosRepository.post('api/Moderation/submit', payload, {
//         headers: { 'Content-Type': 'application/json' }, 
//     });
// };

export const deleteTagImmediately = async (telegramId, tagName) => {
    return fetch(`/api/profile/remove-tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId, tagName })
    });
};
export const deleteUserLinkByIndex = async (telegramId, index) => {
    return fetch(`/api/User/delete-link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegramId, index })
    });
};



const savePendingChange = async (field, newValue) => {
    const payload = {
        telegramId: TELEGRAM_ID.toString(), // обязательно строкой
        changeType: field,
        newValue: newValue
    };

    console.log("♫ Отправка на модерацию:", payload);

    return axiosRepository.post('api/User/save-change', payload);
};




const getProfilesForModeration = async () => {
    const response = await axiosRepository.get('/api/User/profiles-for-moderation');
    return response.data;
};
const approveProfile = async (telegramId) => {
    const response = await axiosRepository.post(`api/User/approve-profile/${telegramId}`);
    return response.data;
};

const rejectProfile = async (telegramId, comment) => {
    const response = await axiosRepository.post(`api/User/reject-profile/${telegramId}`, { comment });
    return response.data;
};
const getProfileWithRoleCheck = async () => {
    const profile = await getProfile();
    if (!profile.role) {
        throw new Error('Роль пользователя не определена');
    }
    return profile;
};
const createProject = async (project) => {
    console.log("Отправляем проект:", project);
    return axiosRepository.post('api/User/create-project', project, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const getProjectById = async (projectId) => {
    const response = await axiosRepository.get(`/api/User/project/${projectId}`);
    return response.data;
};
const getVacancyById = async (projectId, vacancyId) => {
    const response = await axiosRepository.get(`/api/User/project/${projectId}/vacancy/${vacancyId}`);
    return response.data;
};

const getProjects = async (telegramId) => {
    console.log(telegramId + " this id");

    return axiosRepository.get(`api/User/projects/${telegramId}`);
};
// Получить проекты на модерацию
const getProjectsForModeration = async () => {
    const response = await axiosRepository.get('/api/User/projects-for-moderation');

    return response.data;
};

// Одобрить проект
const approveProject = async (projectId) => {
    const response = await axiosRepository.post(`/api/User/approve-project/${projectId}`)
    return response.data;
};

// Отклонить проект
const rejectProject = async (projectId, comment) => {
    const response = await axiosRepository.post(`/api/User/reject-project/${projectId}`, { comment: '...' });
    return response.data;
};
const getAllProjects = async () => {
    const response = await axiosRepository.get('/api/User/all-projects');
    return response.data;
};
const uploadProjectCover = async (file) => {
    console.log(file);

    const formData = new FormData();
    formData.append("image", file); // <--- должно совпадать с именем параметра в контроллере

    const response = await axiosRepository.post(
        'api/User/upload-project-cover',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data;
};
// ✅ Добавлено: отправка заявки на вакансию
const sendApplication = async (data) => {
    return axiosRepository.post('/api/User/apply', data);
};
const getApplications = async (telegramId) => {
    return axiosRepository.get(`/api/User/applications/${telegramId}`);
};

const getAllApplications = async () => {
    const response = await axiosRepository.get('/api/User/all-applications');
    return response.data;
};

const getApplicationsForProject = async (projectId) => {
    const response = await axiosRepository.get(`/api/User/project-applications/${projectId}`);
    return response.data;
};
// В конец объекта export default
const searchUsers = async (query) => {
    console.log(query);

    const trimmedQuery = query?.trim();
    if (!trimmedQuery) {
        throw new Error('Query is required');
    }

    const response = await axiosRepository.get('/api/User/search-users', {
        params: { query: trimmedQuery },
    });
    return response.data;
};

const uploadAvatar = async (file, telegramId) => {
    if (!file || !telegramId) throw new Error('File and telegramId are required');

    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosRepository.post(
        `/api/User/upload-avatar?telegramId=${telegramId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
};

const deleteApplication = async (projectId, vacancyId, telegramId) => {
    return axiosRepository.delete(`/api/User/application`, {
        params: { projectId, vacancyId, telegramId }
    });
};
const addProjectParticipant = async (projectId, name) => {
    return axiosRepository.post('/api/User/add-participant', { projectId, name });
};

const addUserToProjectTeam = async (projectId, telegramId) => {
    return axiosRepository.post('/api/User/add-to-project-team', {
        projectId,
        telegramId
    });
};

export default {
    getProfileByTelegramId,
    getOrCreateUser,
    updateUser,
    getProfile,
    updateUserDescriptionByTelegramId,
    updateUserTagsByTelegramId,
    updateUserStatusByTelegramId,
    updateUserLinksByTelegramId,
    updateUserExperienceByTelegramId,
    getAllAvailableTags,
    updateUserProfileByTelegramId,
    sendToModeration,
    getProfilesForModeration,
    approveProfile,
    rejectProfile,
    getProfileWithRoleCheck,
    savePendingChange,
    deleteTagImmediately,
    createProject,
    getProjects,
    getProjectsForModeration,
    approveProject,
    rejectProject,
    getAllProjects,
    uploadProjectCover,
    getProjectById,
    getVacancyById,
    sendApplication,
    getApplications,
    getAllApplications,
    getApplicationsForProject,
    deleteUserLinkByIndex,
    searchUsers,
    uploadAvatar,
    deleteApplication,
    addProjectParticipant,
    addUserToProjectTeam,
    getUserById,
};

