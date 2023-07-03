import type { Participant, VideoActiveState } from "@zoom/videosdk";
import { create } from "zustand";

export type ParticipantStore = {
  participants: Participant[] & {
    videoActiveState?: VideoActiveState;
  };
  /**
   * userIds of active speakers
   */
  activeSpeakers: number[];
};

const useParticipantStore = create<ParticipantStore>(() => ({
  participants: [],
  activeSpeakers: [],
}));

export default useParticipantStore;
