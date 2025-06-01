interface signinFormDataTypes {
    email: string;
    password: string;
};

interface signupFormDataTypes {
    name: string,
    email: string,
    password: string,
    gender: string,
    age: string,
    about: string,
    skills: string[],
};

export type { signinFormDataTypes, signupFormDataTypes };