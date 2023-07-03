/* eslint-disable @typescript-eslint/no-unsafe-argument */
import useZoomStore from "@/stores/zoom";
import React, { useEffect } from "react";
import activeUserCallback from "./events/active-user";
import userCrudCallback from "./events/user-crud";
import videoActiveChangeCallback from "./events/video-active-change";

/**
 * This component is responsible for listening to all the events
 * that are emitted by the Zoom client and updating the state
 * of the participants.
 */
const ParticipantWrapper = () => {
  const client = useZoomStore((s) => s.client);
  useEffect(() => {
    if (!client) return;
    client.on("user-added", (payload) => userCrudCallback(payload, "add"));
    client.on("user-removed", (payload) => userCrudCallback(payload, "leave"));
    client.on("user-updated", (payload) => userCrudCallback(payload, "update"));
    client.on("active-speaker", activeUserCallback);
    client.on("video-active-change", videoActiveChangeCallback);
    return () => {
      client.off("user-added", (payload) => userCrudCallback(payload, "add"));
      client.off("user-removed", (payload) =>
        userCrudCallback(payload, "leave")
      );
      client.off("user-updated", (payload) =>
        userCrudCallback(payload, "update")
      );
      client.off("active-speaker", activeUserCallback);
      client.off("video-active-change", videoActiveChangeCallback);
    };
  });
  return <></>;
};

export default ParticipantWrapper;
