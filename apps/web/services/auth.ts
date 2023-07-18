import { axiosClient } from ".";
import { User, UserLoginDto } from "types";

export const login = async (userInfo: UserLoginDto) => {
  const res = await axiosClient.post("/user/login", userInfo);
  return res.data;
};

export const register = async (user: User) => {
  const res = await axiosClient.post("/user/register", user);
  return res.data;
};
