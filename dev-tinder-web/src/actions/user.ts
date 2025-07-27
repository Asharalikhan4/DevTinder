import { fetcher } from "@/lib/fetcher";

export async function signup(signupFormData: any) {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`, {
    method: "POST",
    body: JSON.stringify(signupFormData),
  });
};

export async function signin(signinFormData: any) {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`, {
    method: "POST",
    body: JSON.stringify(signinFormData),
  });
};

export async function userProfile() {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/user-profile`);
};

export async function logout() {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`);
};

export async function feed() {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all-users`);
};

export async function userConnections() {
  return fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/user/connections`);
};