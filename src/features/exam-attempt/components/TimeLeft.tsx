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

  useEffect(() => {
    const interval = setInterval(() => {
      const runningFor = dayjs().diff(dayjs(startTime), "seconds");
      setTimeElapsed(runningFor);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const durationInSeconds = duration * 60;
  const timeLeft = dayjs.duration(durationInSeconds - timeElapsed, "seconds");
  const timeLeftString = `${Math.floor(
    timeLeft.asHours() / 60
  )}:${timeLeft.format("mm:ss")}`;
  if (timeLeft.asSeconds() <= 0) {
    submitExamMutation.mutate();
  }

  return <div>Time Left {timeLeftString}</div>;
}
