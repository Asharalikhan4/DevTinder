export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    photoUrl: string;
    about: string;
    skills: string[];
};

export interface CustomTinderCardProps {
    _id: string;
    photoUrl: string;
    name: string;
    age: number;
    gender: string;
    about: string;
};