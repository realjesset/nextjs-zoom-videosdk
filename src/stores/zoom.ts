import type ZoomVideo from "@zoom/videosdk";

import { create } from "zustand";

export type ZoomClient = ReturnType<typeof ZoomVideo.createClient>;

type ZoomStore = {
  client: ZoomClient | undefined;
  /** initialize zoom client function */
  init: () => Promise<void>;
};

const useZoomStore = create<ZoomStore>((set, get) => ({
  client: undefined,

  init: async () => {
    if (get().client) return;
    console.info("[ZoomStore] creating Client");
    const ZoomVideo = (await import("@zoom/videosdk")).default;
    const client = ZoomVideo.createClient();
    await client?.init("en-US", "Global");
    console.info("[ZoomStore] Client created");
    set({ client });
  },
}));

export default useZoomStore;
