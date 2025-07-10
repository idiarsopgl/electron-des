import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notification from './Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.payload }];
    case 'REMOVE_NOTIFICATION':
      return state.filter((notification) => notification.id !== action.id);
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const showNotification = useCallback(({ 
    message, 
    title, 
    severity = 'info', 
    autoHideDuration = 6000,
    action,
    ...props 
  }) => {
    const id = uuidv4();
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id,
        message,
        title,
        severity,
        autoHideDuration,
        action,
        ...props,
      },
    });

    return id;
  }, []);

  const closeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', id });
  }, []);

  const showSuccess = useCallback((message, options = {}) => {
    return showNotification({ 
      message, 
      severity: 'success',
      ...options 
    });
  }, [showNotification]);

  const showError = useCallback((message, options = {}) => {
    return showNotification({ 
      message,
      title: 'Terjadi Kesalahan',
      severity: 'error',
      ...options 
    });
  }, [showNotification]);

  const showWarning = useCallback((message, options = {}) => {
    return showNotification({ 
      message, 
      severity: 'warning',
      ...options 
    });
  }, [showNotification]);

  const showInfo = useCallback((message, options = {}) => {
    return showNotification({ 
      message, 
      severity: 'info',
      ...options 
    });
  }, [showNotification]);

  const value = {
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          open={true}
          onClose={() => closeNotification(notification.id)}
          {...notification}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
