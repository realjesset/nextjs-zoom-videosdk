import useParticipantStore from "@/stores/participant";
import { type ActiveSpeaker } from "@zoom/videosdk";

const activeUserCallback = (payload: ActiveSpeaker[]) => {
  console.log("activeUserCallback", payload);
  useParticipantStore.setState({
    activeSpeakers: payload.map((p) => p.userId),
  });
};

export default activeUserCallback;
