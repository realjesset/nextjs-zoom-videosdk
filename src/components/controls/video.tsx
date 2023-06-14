import useControlStore from "@/stores/control";
import cn from "@/utils/cn";
import React from "react";
import { BiVideo, BiVideoOff } from "react-icons/bi";

const VideoControl = () => {
  const control = useControlStore(({ isVideoOn, toggleVideo }) => ({
    isVideoOn,
    toggleVideo,
  }));

  return (
    <div>
      <button
        className={cn("btn-circle btn", {
          "btn-neutral": !control?.isVideoOn,
          "btn-primary": control?.isVideoOn,
        })}
        onClick={() => {
          void control.toggleVideo();
        }}
      >
        {control?.isVideoOn ? (
          <BiVideoOff className="text-2xl" />
        ) : (
          <BiVideo className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default VideoControl;
