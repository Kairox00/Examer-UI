// ErrorContext.js
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import apiClient, { setupInterceptors } from "../lib/api-client";

type ErrorContextType = {
  error: string | null;
  showError: (message: string) => void;
};

const ErrorAlertContext = createContext<ErrorContextType>({
  error: null,
  showError: () => {},
});

export const ErrorAlertProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  useEffect(() => {
    setupInterceptors(apiClient, showError);
  }, [showError]);

  return (
    <ErrorAlertContext.Provider value={{ error, showError }}>
      {children}
    </ErrorAlertContext.Provider>
  );
};

export const useError = () => useContext(ErrorAlertContext);
