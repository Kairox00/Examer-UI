import Axios, { AxiosInstance } from "axios";

const apiClient = Axios.create({
  baseURL: "http://localhost:3000",
});

export function setupInterceptors(
  apiClient: AxiosInstance,
  showError: (message: string) => void
) {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      showError(error.response?.data?.message || "Unknown error");
      return Promise.reject(error);
    }
  );
}
export default apiClient;
