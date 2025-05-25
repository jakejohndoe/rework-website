// lib/analytics.ts
// TypeScript declarations for gtag
declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
  // Check if analytics is available
  export const isAnalyticsEnabled = (): boolean => {
    return (
      typeof window !== 'undefined' && 
      typeof window.gtag === 'function' &&
      !!process.env.NEXT_PUBLIC_GA_ID && 
      process.env.NEXT_PUBLIC_GA_ID.trim() !== ''
      // Removed NODE_ENV === 'production' check to allow testing in development
    );
  };
  
  // Track page views
  export const trackPageView = (url: string, title?: string): void => {
    if (!isAnalyticsEnabled()) return;
  
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_title: title || document.title,
      page_location: url,
    });
  };
  
  // Track custom events
  export const trackEvent = (
    eventName: string,
    parameters?: {
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ): void => {
    if (!isAnalyticsEnabled()) return;
  
    window.gtag('event', eventName, {
      event_category: parameters?.event_category || 'engagement',
      event_label: parameters?.event_label,
      value: parameters?.value,
      ...parameters,
    });
  };
  
  // Specific tracking functions for ReWork events
  export const analytics = {
    // Email signup events
    emailSignup: (source: string, email?: string) => {
      trackEvent('email_signup', {
        event_category: 'conversion',
        event_label: source,
        custom_source: source,
        // Don't send actual email for privacy
      });
    },
  
    // Form interaction events
    emailFormFocus: (source: string) => {
      trackEvent('email_form_focus', {
        event_category: 'engagement',
        event_label: source,
        custom_source: source,
      });
    },
  
    emailFormSubmitAttempt: (source: string) => {
      trackEvent('email_form_submit_attempt', {
        event_category: 'engagement',
        event_label: source,
        custom_source: source,
      });
    },
  
    // Navigation events
    ctaButtonClick: (buttonLocation: string) => {
      trackEvent('cta_click', {
        event_category: 'engagement',
        event_label: buttonLocation,
        button_location: buttonLocation,
      });
    },
  
    navigationClick: (section: string) => {
      trackEvent('navigation_click', {
        event_category: 'engagement',
        event_label: section,
        section_name: section,
      });
    },
  
    // Admin events (useful for you to track)
    adminLogin: () => {
      trackEvent('admin_login', {
        event_category: 'admin',
        event_label: 'successful_login',
      });
    },
  
    adminEmailExport: (emailCount: number) => {
      trackEvent('admin_email_export', {
        event_category: 'admin',
        event_label: 'csv_export',
        value: emailCount,
        email_count: emailCount,
      });
    },
  
    // Error tracking
    formError: (source: string, errorType: string) => {
      trackEvent('form_error', {
        event_category: 'error',
        event_label: `${source}_${errorType}`,
        error_source: source,
        error_type: errorType,
      });
    },
  
    rateLimitHit: (source: string) => {
      trackEvent('rate_limit_hit', {
        event_category: 'security',
        event_label: source,
        limit_source: source,
      });
    },
  };
  
  // Enhanced ecommerce tracking (for future use)
  export const trackConversion = (
    conversionName: string,
    value?: number,
    currency: string = 'USD'
  ): void => {
    if (!isAnalyticsEnabled()) return;
  
    window.gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GA_ID}/${conversionName}`,
      value: value,
      currency: currency,
    });
  };