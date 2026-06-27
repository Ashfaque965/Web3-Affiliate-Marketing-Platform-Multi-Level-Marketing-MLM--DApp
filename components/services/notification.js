export const notificationService = {
  async requestPushPermission() {
    if (!('Notification' in window)) return 'unsupported';
    
    const permission = await Notification.requestPermission();
    return permission; // 'granted', 'denied', or 'default'
  },

  // Hook into WebSocket connection for realtime notification engines
  connectNotificationSocket(userId, onMessageReceived) {
    const ws = new WebSocket(`wss://api.yourplatform.com/notifications?user=${userId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessageReceived(data);
    };

    return () => ws.close(); // Clean up returned listener function
  }
};