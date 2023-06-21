import axios, { ResponseType } from "axios";

export const httpClient = ({
  responseType = "json",
}: {
  responseType?: ResponseType;
}) => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: process.env.WORKING_ENV !== "product" ? false : true,
    headers: {
      Accept: "*",
      responseType: responseType,
    },
  });

  client.interceptors.request.use(
    async (config) => {
      // const session: Session | null = await getSession();
      // config.headers.Authorization = `Bearer ${session?.access_token ?? ""}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  return client;
};

const axiosClient = httpClient({
  responseType: "json",
});

export const streamClient = httpClient({
  responseType: "stream",
});

export default axiosClient;
