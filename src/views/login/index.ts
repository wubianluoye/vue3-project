import http from "../../http/index";

interface loginForm {
  username: string;
  password: string | number;
  checkPsd?: string | number;
}

export function login(loginForm: loginForm) {
  return http.post("/api/login", loginForm).then((res: any) => {
    return res;
  });
}

export function passwordCheck(value: string) {
  return value.length >= 6 && value.length < 20;
}

export function register(loginForm: loginForm) {}
