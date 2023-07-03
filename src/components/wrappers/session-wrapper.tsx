import useSesssionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import useZoomStore from "@/stores/zoom";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

/**
 * Session Wrapper
 * @description
 * This component is responsible for handling the session starting, joining
 * and leaving. It will also handle the zoom client initialisation and
 * destruction.
 */
const SessionWrapper = () => {
  const router = useRouter();
  const sessionStore = useSesssionStore();
  const { username, userId } = useUserStore(({ username, userId }) => ({
    username,
    userId,
  }));
  const { data: session } = api.session.get.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
      refetchOnWindowFocus: false,
      retry: false,
      refetchInterval: Infinity,
      onError: (error) => {
        console.error(error);
        toast.error("Session doesn't exist, please try again.");
        void router.push("/");
      },
    }
  );

  /**
   * Token Query
   * @description
   * This query is responsible for getting the token from the backend
   * which is used to join sessions.
   */
  api.client.getToken.useQuery(
    {
      sessionId: session?.data?.id as string,
      userId,
      username,
    },
    {
      enabled: !!session?.data?.id,
      refetchOnWindowFocus: false,
      retry: false,
      // cacheTime: 1000 * 60 * 60 * 2,
      refetchInterval: 1000 * 60 * 60 * 2,
      onSuccess: (token) => {
        if (!session) return;
        sessionStore.setData({
          token: token.data,
          topic: session.data.id,
          host: session.data.hostId === userId,
          username,
        });
      },
    }
  );

  const { client, init } = useZoomStore();
  const {
    join,
    leave,
    state: localMeetingState,
    data: localSessionData,
    setState: setLocalMeetingState,
  } = useSesssionStore(({ join, data, state, leave, setState }) => ({
    join,
    data,
    state,
    leave,
    setState,
  }));

  /** initialise the zoom video client */
  useEffect(() => {
    void (async () => {
      await init(); // no need to destroy, it will only be created once
    })();
  }, [init]);

  /** join once session store is updated */
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    /**
     * join session if session store is set
     * and the state is idle
     */
    void (async () => {
      if (!client) return;
      if (localSessionData && localMeetingState === "idle") {
        const { error } = await join();
        if (error) {
          toast.error("Failed to join session");
          void router.push("/");
        }
      } else {
        // CHANGEME - this is a hacky way to handle the retrying
        timeout = setTimeout(() => {
          const state = useSesssionStore.getState().state;
          if (state === "joining" || state === "leaving") {
            toast.error("Failed to join session, retrying...");
            void leave();
            router.reload();
          }
        }, 15000);
      }
    })();

    return () => {
      /**
       * leave session if session when unmounted
       * while state is shown as 'joined' (this can be false positive)
       * and the client is in meeting (this is to prevent false positive)
       * if the client is not in meeting, it means that the user has already
       * left the meeting and we can safely set the state to idle
       */
      const inMeeting =
        client?.getSessionInfo().isInMeeting && localMeetingState === "joined";

      if (inMeeting) {
        void leave();
      } else if (localMeetingState === "joined") setLocalMeetingState("idle");

      clearTimeout(timeout);
    };
  }, [
    client,
    join,
    leave,
    localMeetingState,
    localSessionData,
    router,
    sessionStore,
    setLocalMeetingState,
  ]);

  // console.log("In meeting", client?.getSessionInfo().isInMeeting);
  return <></>;
};

export default SessionWrapper;
