import { useCallback } from 'react';

export const useAnalytics = () => {
  
  // Track a page view
  const trackPageView = useCallback((pageName, properties = {}) => {
    const payload = {
      page: pageName,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      ...properties,
    };

    // Replace with your actual tracking SDK (e.g., mixpanel.track_pageview() or window.gtag())
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics - PageView] ${pageName}`, payload);
    }
  }, []);

  // Track a custom interaction event
  const trackEvent = useCallback((eventName, properties = {}) => {
    const payload = {
      timestamp: new Date().toISOString(),
      ...properties,
    };

    // Replace with your actual tracking SDK (e.g., mixpanel.track() or amplitude.track())
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics - Event] ${eventName}`, payload);
    }
  }, []);

  // Identify a user profile once they connect a wallet or log in
  const identifyUser = useCallback((userId, traits = {}) => {
    // Replace with your actual tracking SDK (e.g., mixpanel.identify())
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics - Identify] User: ${userId}`, traits);
    }
  }, []);

  return {
    trackPageView,
    trackEvent,
    identifyUser,
  };
};