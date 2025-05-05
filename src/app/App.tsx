import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalErrorAlert } from "../components/GlobalErrorAlert";
import { ErrorProvider } from "../stores/ErrorAlertContext";
import "./App.css";
import AppRouter from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <GlobalErrorAlert />
        <AppRouter />
      </ErrorProvider>
    </QueryClientProvider>
  );
}

export default App;
