import useManagerStore from "@/stores/manager";
import useSesssionStore from "@/stores/session";
import useZoomStore from "@/stores/zoom";
import React, { useEffect } from "react";

const ManagerWrapper = () => {
  const setManager = useManagerStore((s) => s.setManager);
  const session = useSesssionStore(({ state, data }) => ({ state, data }));
  const client = useZoomStore((s) => s.client);

  // TODO docs
  useEffect(() => {
    if (
      !client ||
      !session.data ||
      session.state === "idle" ||
      !client.getSessionInfo().isInMeeting
    )
      return;
    const stream = client.getMediaStream();
    const recording = client.getRecordingClient();
    const transcription = client.getLiveTranscriptionClient();
    const chat = client.getChatClient();
    setManager({ stream, recording, transcription, chat });
    return () => {
      setManager({
        stream: undefined,
        recording: undefined,
        transcription: undefined,
        chat: undefined,
      });
    };
  }, [client, session, setManager]);
  return <></>;
};

export default ManagerWrapper;
