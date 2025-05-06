import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
dayjs.extend(duration);

export default function TimeLeft({
  startTime,
  duration,
  submitExamMutation,
}: {
  startTime: string;
  duration: number;
  submitExamMutation: any;
}) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const runningFor = dayjs().diff(dayjs(startTime), "seconds");
      setTimeElapsed(runningFor);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const timeLeft = dayjs.duration(duration - timeElapsed, "seconds");
  const timeLeftString = timeLeft.format("HH:mm:ss");
  if (timeLeft.asSeconds() <= 0 && !examSubmitted) {
    submitExamMutation.mutate();
    setExamSubmitted(true);
  }

  return <div>Time Left {timeLeftString}</div>;
}
