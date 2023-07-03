import useManagerStore from "@/stores/manager";
import useParticipantStore from "@/stores/participant";
import useUserStore from "@/stores/user";
import useZoomStore from "@/stores/zoom";
import cn from "@/utils/cn";
import React from "react";
import { BiMicrophoneOff } from "react-icons/bi";

type Props = {
  username: string;
  userId: number;
};

const ParticipantGrid = ({ userId, username }: Props) => {
  const client = useZoomStore((s) => s.client);
  const stream = useManagerStore((s) => s.stream);
  const activeSpeakers = useParticipantStore((s) => s.activeSpeakers);

  console.log("activeSpeakers", activeSpeakers);

  return (
    <div
      className={cn(
        "relative h-full min-h-[250px] select-none overflow-hidden rounded-xl bg-base-300",
        {
          "ring-1": activeSpeakers.includes(userId),
        }
      )}
    >
      {userId === client?.getCurrentUserInfo()?.userId &&
      stream?.isRenderSelfViewWithVideoElement() ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          id={`video-${userId}`}
        />
      ) : (
        <canvas
          className="absolute inset-0 left-1/2 top-1/2 aspect-video h-full w-[113%] -translate-x-1/2 -translate-y-1/2 transform"
          id={`video-${userId}`}
        />
      )}
      <div className="relative grid h-full grid-cols-2 ">
        <p className="col-span-2 ml-auto">
          <BiMicrophoneOff />
        </p>

        <p className="col-span-2 ml-auto mt-auto w-full rounded-b-xl bg-primary p-2 text-right text-primary-content">
          {username}
        </p>
      </div>
    </div>
  );
};

export default ParticipantGrid;
