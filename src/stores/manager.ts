import { create } from "zustand";
import { type ZoomClient } from "./zoom";

type ManagerStore = {
  stream?: ReturnType<ZoomClient["getMediaStream"]>;
  recording?: ReturnType<ZoomClient["getRecordingClient"]>;
  chat?: ReturnType<ZoomClient["getChatClient"]>;
  transcription?: ReturnType<ZoomClient["getLiveTranscriptionClient"]>;
  setManager: (manager: {
    stream?: ReturnType<ZoomClient["getMediaStream"]>;
    recording?: ReturnType<ZoomClient["getRecordingClient"]>;
    chat?: ReturnType<ZoomClient["getChatClient"]>;
    transcription?: ReturnType<ZoomClient["getLiveTranscriptionClient"]>;
  }) => void;
};

const useManagerStore = create<ManagerStore>((set, get) => ({
  setManager: (manager) => {
    const { stream, recording, chat, transcription } = get();
    set({ stream, recording, chat, transcription, ...manager });
  },
  stream: undefined,
  recording: undefined,
  chat: undefined,
  transcription: undefined,
}));
export default useManagerStore;
