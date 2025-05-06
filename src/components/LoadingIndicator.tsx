import { CircularProgress } from "@mui/material";
import { useLoading } from "../stores/LoadingContext";

export default function LoadingIndicator() {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <CircularProgress
      sx={{ margin: "0 auto", position: "absolute", top: "50%", left: "50%" }}
    />
  );
}
