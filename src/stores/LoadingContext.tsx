import { createContext, useCallback, useContext, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  showLoading: () => {},
});

export const LoadingProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
