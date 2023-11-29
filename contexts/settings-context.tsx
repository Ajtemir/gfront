'use client'

import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

interface Settings {
  direction?: 'ltr' | 'rtl';
  responsiveFontSizes?: boolean;
  theme: 'light' | 'dark';
}

const initialSettings: Settings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'light'
}

interface SettingsContextValue {
  settings: Settings;
  saveSettings: (update: Settings) => void;
}



const restoreSettings = (): Settings | null => {
  let settings: Settings | null = null;

  try {
    const storedData: string | null = globalThis.localStorage.getItem('settings');
    if (storedData) {
      settings = JSON.parse(storedData)
    }
    else {
      settings = {
        direction: 'ltr',
        responsiveFontSizes: true,
        theme: globalThis.matchMedia('prefers-color-scheme: dark').matches
          ? 'dark'
          : 'light'
      }
    }
  } catch (err) {
    // If stored data is not a stringified JSON this will fail,
    // that's why we catch the error
    console.error(err)
  }

  return settings;
}

const storeSettings = (settings: Settings): void => {
  globalThis.localStorage.setItem('settings', JSON.stringify(settings))
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {}
})

const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, [])

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };
  
  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export {
  type Settings,
  type SettingsContextValue,
  restoreSettings,
  storeSettings,
  SettingsContext,
  SettingsProvider,
}
