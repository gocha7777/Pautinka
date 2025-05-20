import axiosRepository from '../axiosRepository';

const API_URL = 'api/User/get-or-create';

const getTelegramUser = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe?.user || null;
  }
  return null;
};

const authorize = async (initDataOrId) => {
  if (!initDataOrId) {
    console.error('initDataOrId отсутствует. Проверьте данные перед отправкой.');
    return { success: false, error: 'initDataOrId is required.' };
  }

  try {
    console.log("initDataOrId перед отправкой:", initDataOrId);
    console.log('Отправка запроса на сервер с initDataOrId:', initDataOrId);
    const response = await axiosRepository.post(API_URL, { telegramId: initDataOrId });
    console.log('Ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при авторизации через Telegram:', error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export default {
  getTelegramUser,
  authorize,
};