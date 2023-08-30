import { axiosClient } from ".";
import { toast } from "react-hot-toast";
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

export const subcribePayment = async (type: string) => {
  const res = await axiosClient.post("/team/subcribe", {
    type,
  });
  const url = res?.data?.url;
  if (url) {
    window.location.href = url;
  } else {
    toast.error(`Subcribe ${type} plan fail`);
  }
};
