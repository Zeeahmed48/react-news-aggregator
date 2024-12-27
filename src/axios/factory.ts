import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios';

export const createAxiosInstance = (
  baseURL: string,
  config: Omit<CreateAxiosDefaults, 'baseURL'> = {}
) => {
  return axios.create({ baseURL, ...config });
};

export const fetchData = async <T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.get<T>(endpoint, config);
  return response.data;
};
