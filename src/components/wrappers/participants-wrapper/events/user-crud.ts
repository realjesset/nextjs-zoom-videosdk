import useParticipantStore from "@/stores/participant";
import useZoomStore from "@/stores/zoom";
import type { ParticipantPropertiesPayload } from "@zoom/videosdk";

const userCrudCallback = (
  _payload: Array<ParticipantPropertiesPayload>,
  action: "add" | "leave" | "update"
) => {
  const participants = useZoomStore.getState().client?.getAllUser();
  switch (action) {
    case "add":
      useParticipantStore.setState({ participants });
      break;
    case "leave":
      useParticipantStore.setState({ participants });
      break;
    case "update":
      useParticipantStore.setState((s) => ({
        participants,
        activeSpeakers: [
          ...s.activeSpeakers.filter(
            (id) => !participants?.find((p) => p.userId === id)?.muted // remove new muted users
          ),
        ],
      }));
      break;
  }
};

export default userCrudCallback;
