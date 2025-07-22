// File: app/context/AppContext.tsx

import React, { createContext, ReactNode, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

interface Items {
  [key: string]: string[];
}

// Define the shape of our context
interface AppContextType {
  items: Items;
  setItems: React.Dispatch<React.SetStateAction<Items>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  subjects: string[];
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  stream: string;
  setStream: React.Dispatch<React.SetStateAction<string>>;
  branch: string;
  setBranch: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark') => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useNativeColorScheme();

  // State for calendar activities
  const [items, setItems] = useState<Items>({
    '2025-07-15': ['Project kickoff meeting'],
    '2025-07-16': ['Develop feature A'],
  });

  // State for user profile
  const [name, setName] = useState('Ritarshi Roy');
  const [subjects, setSubjects] = useState<string[]>(['Physics', 'Calculus']);
  const [stream, setStream] = useState('B.Tech');
  const [branch, setBranch] = useState('CE');
  const [year, setYear] = useState('III');

  // State for the color scheme
  const [colorScheme, _setColorScheme] = useState<'light' | 'dark'>(systemTheme ?? 'light');

  const setColorScheme = (scheme: 'light' | 'dark') => {
    _setColorScheme(scheme);
  };

  return (
    <AppContext.Provider value={{ items, setItems, name, setName, subjects, setSubjects, stream, setStream, branch, setBranch, year, setYear, colorScheme, setColorScheme }}>
      {children}
    </AppContext.Provider>
  );
};
