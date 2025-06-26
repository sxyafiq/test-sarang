"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import Image from "next/image";

const Loading = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-[40%] flex flex-col items-center gap-6">
        <Image
          src={
            "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXhpMzVnZHU5c3Z6bTJ3N2RpcnJkeTBvZGJkbHdzamNqcTdpaDlybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pFZTlrO0MV6LoWSDXd/giphy-downsized.gif"
          }
          width={480}
          height={288}
          alt="MrBean"
        />
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default Loading;
