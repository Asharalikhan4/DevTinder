import { BACKEND_BASE_URL } from "../constant";
import {signinFormDataTypes} from "../globalTypes/user";
import fetcher from "../lib/fetcher";

export async function signin(signinFormData: signinFormDataTypes) {
  return fetcher(`${BACKEND_BASE_URL}/user/signin`, {
    method: "POST",
    body: JSON.stringify(signinFormData),
  });
}

export async function signup(signupFormData: any) {
  return fetcher(`${BACKEND_BASE_URL}/user/signup`, {
    method: "POST",
    body: JSON.stringify(signupFormData),
  });
}

export async function userProfile() {
  return fetcher("http://10.0.2.2:8080/user/user-profile");
}

export async function logout() {
  return fetcher("http://10.0.2.2:8080/user/logout");
}

export async function feed() {
  return fetcher("http://10.0.2.2:8080/user/all-users");
}
