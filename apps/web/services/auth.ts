import { axiosClient } from ".";
import { User, UserLoginDto } from "types";

export const login = async (userInfo: UserLoginDto) => {
  const res = await axiosClient.post("/user/login", userInfo);
  return res.data as { access_token: string };
};

export const register = async (user: User) => {
  const res = await axiosClient.post("/user/register", user);
  return res.data as { access_token: string };
};

export const logout = async () => {
  return axiosClient.post("/user/logout");
};

export const getRefreshtoken = async () => {
  const res = await axiosClient.post("/user/refresh");
  return res.data as { access_token: string };
};
