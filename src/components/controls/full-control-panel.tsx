import React from "react";
import HangupControl from "./hangup";
import MuteControl from "./mute";
import VideoControl from "./video";

const FullControlPanel = () => {
  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform justify-center">
      {/* TODO add a notification panel above control panel */}
      <div className="flex gap-6 rounded-full bg-base-content p-4 backdrop-blur-xl">
        <VideoControl />
        <MuteControl />
        <HangupControl />
      </div>
    </div>
  );
};

export default FullControlPanel;
