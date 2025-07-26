import React, { createContext, ReactNode, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

interface Items {
  [key: string]: string[];
}

interface Reminder {
  id: string;
  date: string;
}

// This represents the currently logged-in user
export interface User {
    uid: string;
    name: string;
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
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useNativeColorScheme();

  const [items, setItems] = useState<Items>({});
  const [name, setName] = useState('Ritarshi Roy');
  const [subjects, setSubjects] = useState<string[]>(['Physics']);
  const [stream, setStream] = useState('B.Tech');
  const [branch, setBranch] = useState('CE');
  const [year, setYear] = useState('III');
  const [colorScheme, _setColorScheme] = useState<'light' | 'dark'>(systemTheme ?? 'light');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  // --- FIX IS HERE ---
  // We initialize the user with a default value based on the profile name.
  // This ensures the user is never null after the app loads.
  const [user, setUser] = useState<User | null>({
      uid: 'default-user-id-12345', // A consistent placeholder ID
      name: name, // Use the name from the profile state
  });

  const setColorScheme = (scheme: 'light' | 'dark') => {
    _setColorScheme(scheme);
  };

  return (
    <AppContext.Provider value={{ 
        items, setItems, 
        name, setName, 
        subjects, setSubjects, 
        stream, setStream, 
        branch, setBranch, 
        year, setYear, 
        colorScheme, setColorScheme,
        reminders, setReminders,
        user, setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
