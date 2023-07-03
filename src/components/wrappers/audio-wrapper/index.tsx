import useManagerStore from "@/stores/manager";
import useZoomStore from "@/stores/zoom";
import React, { useEffect } from "react";
import currentAudioChangeCallback from "./events/current-audio-change";

type Props = {
  /**
   * The initial muted state of the audio.
   */
  initiallyMuted?: boolean;
};

/**
 * Audio Wrapper
 * @description handling all the audio related functions and events
 * and syncing them with control store
 */
const AudioWrapper = ({ initiallyMuted }: Props) => {
  const client = useZoomStore((s) => s.client);
  const stream = useManagerStore((s) => s.stream);

  useEffect(() => {
    if (!client || !client.getSessionInfo().isInMeeting || !stream) return;

    void (async () => {
      try {
        // TODO safari does not support this (refactor for safari)
        await stream?.startAudio({
          backgroundNoiseSuppression: true,
          mute: initiallyMuted ?? true,
          autoStartAudioInSafari: true,
        });
      } catch (error) {
        console.error("[Audio] Error starting audio", error);
      }
    })();
  }, [client, initiallyMuted, stream]);

  useEffect(() => {
    if (!client) return;

    client.on("auto-play-audio-failed", () => {
      // TODO ask for interaction
      console.log("auto play failed, waiting for a user interaction");
    });
    client.on("current-audio-change", currentAudioChangeCallback);
    return () => {
      client.off("current-audio-change", currentAudioChangeCallback);
    };
  }, [client]);
  return <></>;
};

export default AudioWrapper;
