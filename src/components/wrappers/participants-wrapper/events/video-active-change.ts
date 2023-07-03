import useParticipantStore from "@/stores/participant";
import type { VideoActiveState } from "@zoom/videosdk";

const videoActiveChangeCallback = (payoad: {
  state: VideoActiveState;
  userId: number;
}) => {
  useParticipantStore.setState((state) => ({
    participants: state.participants.map((participant) => ({
      ...participant,
      videoActiveState:
        participant.userId === payoad.userId ? payoad.state : undefined,
    })),
  }));
};

export default videoActiveChangeCallback;
