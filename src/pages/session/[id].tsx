import Grid from "@/components/grid";
import AudioWrapper from "@/components/wrappers/audio-wrapper";
import ManagerWrapper from "@/components/wrappers/manager-wrapper";
import ParticipantWrapper from "@/components/wrappers/participants-wrapper";
import SessionWrapper from "@/components/wrappers/session-wrapper";
import StatisticsWrapper from "@/components/wrappers/statistics-wrapper";
import useZoomStore from "@/stores/zoom";
import React from "react";

const Session = () => {
  const client = useZoomStore((s) => s.client);
  return (
    <>
      {client && client.getSessionInfo().isInMeeting && "in Meeting"}
      <SessionWrapper /> {/* session handler */}
      <ManagerWrapper /> {/* session manager handler */}
      <StatisticsWrapper /> {/* statistics handler */}
      <ParticipantWrapper /> {/* particiapnts events */}
      <AudioWrapper /> {/* self audio events  */}
      <Grid />
    </>
  );
};

export default Session;
