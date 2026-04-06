const KEY = "notifications";

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const addNotification = (notification) => {
  const old = getNotifications();
  localStorage.setItem(KEY, JSON.stringify([notification, ...old]));
};

export const clearNotifications = () => {
  localStorage.removeItem(KEY);
};
