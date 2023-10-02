import useManagerStore from "@/stores/manager";
import useParticipantStore from "@/stores/participant";
import useZoomStore from "@/stores/zoom";
import cn from "@/utils/cn";
import React, { useEffect } from "react";
import FullControlPanel from "../controls/full-control-panel";
import ParticipantGrid from "./participant-grid";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const Grid = ({ className }: Props) => {
  const client = useZoomStore((s) => s.client);
  const stream = useManagerStore((s) => s.stream);

  const participants = useParticipantStore((s) => s.participants);
  const inMeeting = client?.getSessionInfo().isInMeeting;

  useEffect(() => {
    if (!client || !stream) return;
    const onVideoStateChange = (payload: {
      action: "Start" | "Stop";
      userId: number;
    }) => {
      const self = client?.getCurrentUserInfo();
      if (
        self?.userId === payload.userId &&
        stream.isRenderSelfViewWithVideoElement()
      )
        return;

      const canvas = document.getElementById(
        `video-${payload.userId}`
      ) as HTMLCanvasElement;
      if (!canvas) return;
      if (payload.action === "Start") {
        void stream.renderVideo(canvas, payload.userId, 1920, 1080, 0, 0, 3);
      } else if (payload.action === "Stop") {
        void stream.stopRenderVideo(canvas, payload.userId);
      }
    };
    client.on("peer-video-state-change", onVideoStateChange);
    return () => {
      client.off("peer-video-state-change", onVideoStateChange);
    };
  }, [client, stream]);

  return (
    <div className="">
      <div className={cn("relative h-[95vh] bg-base-200/50 p-2", className)}>
        {participants.length > 1 && (
          <div
            className={cn(
              `grid h-full w-full grid-cols-3 grid-rows-3 items-center gap-2`
            )}
          >
            {participants.map((participant) => (
              <ParticipantGrid
                key={participant.userId}
                username={participant.userIdentity || "Anonymous"}
                userId={participant.userId}
              />
            ))}
          </div>
        )}
        {participants?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-semibold">No Participants</h1>
            <p className="text-base text-base-content">
              You are the only one in the room
            </p>
          </div>
        )}
        {inMeeting && <FullControlPanel />}
      </div>
    </div>
  );
};

export default Grid;
