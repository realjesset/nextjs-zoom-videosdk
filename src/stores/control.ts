import { create } from "zustand";
import useManagerStore from "./manager";
import useUserStore from "./user";
import useZoomStore from "./zoom";

type ControlStore = {
  isAudioMuted: boolean;
  isHostMuted: boolean;
  isVideoOn: boolean;
  audioError: AudioErrorState | null;
  toggleAudio: (mute?: boolean) => Promise<void>;
  toggleVideo: () => Promise<void>;
};

export enum AudioErrorState {
  PERMISSION_DENIED = "PERMISSION_DENIED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  UNKNOWN = "UNKNOWN",
}

export enum AudioErrorText {
  PERMISSION_DENIED = "Permission denied",
  NOT_SUPPORTED = "Audio not supported",
  UNKNOWN = "Please check your audio device",
}

const useControlStore = create<ControlStore>((set, get) => ({
  isAudioMuted: false,
  isVideoOn: false,
  isHostMuted: false,
  audioError: null,
  toggleAudio: async (mute) => {
    console.log({ host: get().isHostMuted, mute });
    if (get().isHostMuted) return;

    const stream = useManagerStore.getState().stream;
    try {
      if (!stream) return;
      const isAudioMuted = mute !== undefined ? mute : stream.isAudioMuted();
      console.log("toggle audio", { isAudioMuted });
      if (isAudioMuted) await stream.unmuteAudio();
      else await stream.muteAudio();

      set({ isAudioMuted: !isAudioMuted }); // optimistic update
    } catch (e) {
      set({ audioError: AudioErrorState.PERMISSION_DENIED });
    }
  },
  toggleVideo: async () => {
    const stream = useManagerStore.getState().stream;
    if (!stream) return;

    const isVideoOn = stream.isCapturingVideo();
    if (isVideoOn) await stream.stopVideo();
    else
      await stream.startVideo({
        mirrored: true,
        videoElement: stream.isRenderSelfViewWithVideoElement()
          ? (document.getElementById(
              `video-${
                useZoomStore
                  .getState()
                  .client?.getCurrentUserInfo()
                  .userId.toString() || ""
              }`
            ) as HTMLVideoElement)
          : undefined,
      });

    set({ isVideoOn: !isVideoOn });
  },
}));

export default useControlStore;
