import useControlStore from "@/stores/control";
import cn from "@/utils/cn";
import React from "react";
import { BiVideo, BiVideoOff } from "react-icons/bi";

const VideoControl = () => {
  const { isVideoLoading, isVideoOn, toggleVideo } = useControlStore(
    ({ isVideoOn, toggleVideo, isVideoLoading }) => ({
      isVideoOn,
      toggleVideo,
      isVideoLoading,
    })
  );

  return (
    <div>
      <button
        className={cn("btn-circle btn", {
          "btn-disabled btn-warning": isVideoLoading,
          "btn-primary": isVideoOn && !isVideoLoading,
          "btn-secondary": !isVideoOn && !isVideoLoading,
        })}
        onClick={() => {
          void toggleVideo();
        }}
      >
        {(isVideoLoading && <span className="loading loading-spinner" />) ||
          (isVideoOn ? (
            <BiVideo className="text-2xl" />
          ) : (
            <BiVideoOff className="text-2xl" />
          ))}
      </button>
    </div>
  );
};

export default VideoControl;
