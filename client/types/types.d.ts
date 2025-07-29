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
