interface signinFormDataTypes {
  email: string;
  password: string;
}

interface SignupFormDataTypes {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: string;
  about: string;
  skills: string[];
}

export type {signinFormDataTypes, SignupFormDataTypes};
