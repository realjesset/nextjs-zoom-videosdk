import useManagerStore from "@/stores/manager";
import useZoomStore from "@/stores/zoom";
import React, { useEffect } from "react";

/** use this wrapper to collect statistical data */
const StatisticsWrapper = () => {
  const { stream: media } = useManagerStore();
  const client = useZoomStore((s) => s.client);
  useEffect(() => {
    if (media && client?.getSessionInfo().isInMeeting) {
      void media.subscribeAudioStatisticData();
      void media.subscribeVideoStatisticData();
      void media.subscribeShareStatisticData();
    }
    return () => {
      // if (!client || !client.getSessionInfo().isInMeeting) return;
      void media?.unsubscribeAudioStatisticData();
      void media?.unsubscribeVideoStatisticData();
      void media?.unsubscribeShareStatisticData();
    };
  });

  return <></>;
};

export default StatisticsWrapper;
