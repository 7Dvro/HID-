export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'imam' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
}

export interface Imam {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: any;
}

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}