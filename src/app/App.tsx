import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalErrorAlert } from "../components/GlobalErrorAlert";
import LoadingIndicator from "../components/LoadingIndicator";
import { ErrorAlertProvider } from "../stores/ErrorAlertContext";
import { LoadingProvider } from "../stores/LoadingContext";
import "./App.css";
import AppRouter from "./router";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorAlertProvider>
        <LoadingProvider>
          <LoadingIndicator />
          <GlobalErrorAlert />
          <AppRouter />
        </LoadingProvider>
      </ErrorAlertProvider>
    </QueryClientProvider>
  );
}

export default App;
