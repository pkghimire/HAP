import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface SiteSettings {
  themeColor: string;
  secondaryColor: string;
  logoUrl: string;
  heroImageUrl: string;
}

const defaultSettings: SiteSettings = {
  themeColor: '#ea580c', // Default orange-600
  secondaryColor: '#0f172a', // Default slate-900
  logoUrl: '',
  heroImageUrl: '',
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const cached = localStorage.getItem('siteSettings');
    if (cached) {
      try {
        return { ...defaultSettings, ...JSON.parse(cached) };
      } catch (e) {
        console.error('Failed to parse cached settings', e);
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        const newSettings = { ...defaultSettings, ...docSnap.data() };
        setSettings(newSettings);
        localStorage.setItem('siteSettings', JSON.stringify(newSettings));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <style>
        {`
          :root {
            --theme-base: ${settings.themeColor};
            --theme-50: color-mix(in srgb, var(--theme-base) 10%, white);
            --theme-100: color-mix(in srgb, var(--theme-base) 20%, white);
            --theme-200: color-mix(in srgb, var(--theme-base) 40%, white);
            --theme-300: color-mix(in srgb, var(--theme-base) 60%, white);
            --theme-400: color-mix(in srgb, var(--theme-base) 80%, white);
            --theme-500: var(--theme-base);
            --theme-600: color-mix(in srgb, var(--theme-base) 80%, black);
            --theme-700: color-mix(in srgb, var(--theme-base) 60%, black);
            --theme-800: color-mix(in srgb, var(--theme-base) 40%, black);
            --theme-900: color-mix(in srgb, var(--theme-base) 20%, black);
            --theme-950: color-mix(in srgb, var(--theme-base) 10%, black);

            --secondary-base: ${settings.secondaryColor};
            --secondary-50: color-mix(in srgb, var(--secondary-base) 10%, white);
            --secondary-100: color-mix(in srgb, var(--secondary-base) 20%, white);
            --secondary-200: color-mix(in srgb, var(--secondary-base) 40%, white);
            --secondary-300: color-mix(in srgb, var(--secondary-base) 60%, white);
            --secondary-400: color-mix(in srgb, var(--secondary-base) 80%, white);
            --secondary-500: var(--secondary-base);
            --secondary-600: color-mix(in srgb, var(--secondary-base) 80%, black);
            --secondary-700: color-mix(in srgb, var(--secondary-base) 60%, black);
            --secondary-800: color-mix(in srgb, var(--secondary-base) 40%, black);
            --secondary-900: color-mix(in srgb, var(--secondary-base) 20%, black);
            --secondary-950: color-mix(in srgb, var(--secondary-base) 10%, black);
          }
        `}
      </style>
      {children}
    </SettingsContext.Provider>
  );
}
