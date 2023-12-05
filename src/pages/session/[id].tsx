import Grid from "@/components/grid";
import AudioWrapper from "@/components/wrappers/audio-wrapper";
import ManagerWrapper from "@/components/wrappers/manager-wrapper";
import ParticipantWrapper from "@/components/wrappers/participants-wrapper";
import SessionWrapper from "@/components/wrappers/session-wrapper";
import StatisticsWrapper from "@/components/wrappers/statistics-wrapper";
import useZoomStore from "@/stores/zoom";
import React, { useEffect } from "react";

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
      {/* <InviteByPhone /> */}
      <Grid />
    </>
  );
};

const InviteByPhone = () => {
  const client = useZoomStore((s) => s.client);
  const stream = client?.getMediaStream();
  const handleInviteByPhone = () => {
    const countryCode = "+1";
    console.log("codes", stream?.getSupportCountryInfo());
    if (
      stream &&
      stream
        .getSupportCountryInfo()
        .findIndex((country) => country.code === countryCode) > -1
    ) {
      console.log("is allowed country");
      stream.inviteByPhone(countryCode, "2134595736", "Jesse");
    }
    console.log("is not allowed country");
  };
  useEffect(() => {
    if (!client) return;
    const onInviteByPhoneStatus = (payload: any) => {
      console.log("event", payload);
    };
    client.on("dialout-state-change", onInviteByPhoneStatus);

    return () => {
      client.off("dialout-state-change", onInviteByPhoneStatus);
    };
  }, []);
  return <div onClick={handleInviteByPhone}>InviteByPhone</div>;
};

export default Session;
