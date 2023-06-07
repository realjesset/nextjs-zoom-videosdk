import type ZoomVideo from "@zoom/videosdk";

import { create } from "zustand";

type ZoomStore = {
  client: ReturnType<typeof ZoomVideo.createClient>;
  init: () => Promise<void>;
};

const useZoomStore = create<ZoomStore>((set, get) => ({
  client: undefined as unknown as ZoomStore["client"],
  init: async () => {
    if (get().client) return;
    console.info("[Zoom] creating Client");
    const ZoomVideo = (await import("@zoom/videosdk")).default;
    const client = ZoomVideo.createClient();
    console.info("[Zoom] Client created");
    set({ client });
  },
}));

export default useZoomStore;
