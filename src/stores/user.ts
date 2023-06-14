import { uuid } from "uuidv4";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  username: string;
  /** used for internal tracking */
  userId: string;
  createUserId: () => void;
  setUsername: (username: string) => void;
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      username: undefined as unknown as string,
      userId: undefined as unknown as string,
      createUserId: () =>
        set({
          userId: uuid(),
        }),
      setUsername: (username) =>
        set({
          username,
        }),
    }),
    { name: "user" }
  )
);
export default useUserStore;
