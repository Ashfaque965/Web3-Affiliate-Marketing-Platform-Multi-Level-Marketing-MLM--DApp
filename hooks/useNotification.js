import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  // Add a notification toast (type can be 'success', 'error', 'info')
  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove notification after specified duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  // Remove a notification manually by ID
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Clear all active notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };
};