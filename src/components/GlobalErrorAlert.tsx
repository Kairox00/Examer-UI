import { Alert, Snackbar } from "@mui/material";
import { useError } from "../stores/ErrorAlertContext";

export const GlobalErrorAlert: React.FC = () => {
  const { error } = useError();
  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  );
};
