import { create } from "zustand";
import { persist } from "zustand/middleware";
import useZoomStore from "./zoom";

// if on popover, wait few seconds before disconnecting on /session

type Session = {
  id?: string;
  topic: string;
  username: string;
  password?: string;
  host: boolean;
  token: string;
};

type SessionState = "idle" | "joining" | "joined" | "leaving";

type SessionStore = {
  data: Session | undefined;
  state: "idle" | "joining" | "joined" | "leaving";
  setState: (state: SessionState) => void;
  setData: (session: Session) => void;
  /** leave the session
   * @param end end the session (only by host)
   */
  leave: (end?: boolean) => Promise<{ state: SessionState; error?: string }>;
  join: () => Promise<{ state: SessionState; error?: string }>;
};

const useSesssionStore = create(
  persist<SessionStore>(
    (set, get) => ({
      data: undefined,
      state: "idle",
      setState: (state) => set({ state }),
      setData: (session) => set({ data: session }),
      join: async () => {
        const client = useZoomStore.getState().client;
        if (!client) return { state: "idle", error: "Zoom Client not ready" };
        const session = get().data;
        try {
          console.log("[SessionStore] Joining Session");
          set({ state: "joining" });
          if (!session) {
            throw new Error("Session not found");
          }
          await client?.join(
            session.id as string,
            session.topic,
            session.username,
            "1234567"
          );
        } catch (e) {
          console.error("[SessionStore] ", e);
          set({ state: "idle" });
          return { state: "idle", error: "Error joining session" };
        } finally {
          set({ data: session, state: "joined" });
          return { state: "joined" };
        }
      },
      leave: async (end) => {
        try {
          console.info("[SessionStore] Leaving Session");
          set({ state: "leaving" });
          await useZoomStore.getState().client?.leave(end);
        } catch (e) {
          console.error("[SessionStore] ", e);
          set({ state: "joined" });
          return { state: "joined", error: "Error leaving session" };
        } finally {
          set({ data: undefined, state: "idle" });
          return { state: "idle" };
        }
      },
    }),
    { name: "session" }
  )
);
export default useSesssionStore;
