export type IUserInput = {
  username: string;
  name?: string;
  email: string;
  password: string;
};

export type IErrors = {
  username: string[];
  name?: string[];
  email: string[];
  password: string[];
};

export type IForgetPwdErros = {
  email: string[];
}

export type IResetPwdErrors = {
  token: string[];
  password: string[];
}
