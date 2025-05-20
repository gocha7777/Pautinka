import axiosRepository from '../axiosRepository';

const fetchUserByTelegramId = async (telegramId) => {
    try {
        const response = await axiosRepository.get(`api/User/get-user-by-telegram/${telegramId}`);
        console.log('Профиль пользователя:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке профиля:', error.response?.data || error.message);
        throw error;
    }
};

export default { fetchUserByTelegramId };