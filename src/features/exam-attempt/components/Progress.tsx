import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Progress({
  activeQuestionIndex,
  numberOfQuestions,
}: {
  activeQuestionIndex: number;
  numberOfQuestions: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((activeQuestionIndex + 1) / numberOfQuestions) * 100);
  }, [activeQuestionIndex, numberOfQuestions]);
  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        padding={1}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <Typography>
          {activeQuestionIndex + 1}/{numberOfQuestions}
        </Typography>
        <LinearProgress
          sx={{ height: "10px", width: "100%" }}
          variant="determinate"
          value={progress}
        />
      </Stack>
    </Box>
  );
}
