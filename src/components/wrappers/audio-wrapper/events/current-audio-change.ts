import useControlStore from "@/stores/control";

export enum AudioChangeAction {
  /**
   * Join the audio.
   */
  Join = "join",
  /**
   * Leave the audio.
   */
  Leave = "leave",
  /**
   * Muted.
   */
  Muted = "muted",
  /**
   * Unmuted.
   */
  Unmuted = "unmuted",
}

/**
 * Payload audio muted source type for current-audio-change event.
 */
export enum MutedSource {
  /**
   * User actively muted.
   */
  Active = "active",
  /**
   * The host muted the user.
   */
  PassiveByMuteOne = "passive(mute one)",
  /**
   * The host muted all users.
   */
  PassiveByMuteAll = "passive(mute all)",
}

export type CurrentAudioChangePayload = {
  action: AudioChangeAction;
  type?: "phone" | "computer" | undefined;
  source?: MutedSource | undefined;
};
/**
 * Callback for current-audio-change event.
 *
 * @description
 * This event is triggered when the user joins or leaves the audio, or when the user is muted or * unmuted. This will update the useControlStore, and the UI will be updated accordingly.
 */
const currentAudioChangeCallback = (payload: CurrentAudioChangePayload) => {
  console.log("audio change", { payload });
  switch (payload.action) {
    case AudioChangeAction.Join:
    case AudioChangeAction.Leave: {
      return useControlStore.setState({
        isHostMuted: false,
        isAudioMuted: true,
      });
    }
    case AudioChangeAction.Muted: {
      if (payload.source === MutedSource.Active) {
        // actively muted
        return useControlStore.setState({ isAudioMuted: true });
      } else {
        // passively muted by host
        return useControlStore.setState({
          isHostMuted: true,
          isAudioMuted: true,
        });
      }
    }
    case AudioChangeAction.Unmuted: {
      return useControlStore.setState({
        isHostMuted: false,
        isAudioMuted: false,
      });
    }
  }
};

export default currentAudioChangeCallback;
