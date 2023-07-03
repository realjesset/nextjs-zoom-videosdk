import useControlStore, { AudioErrorState } from "@/stores/control";
import cn from "@/utils/cn";
import React from "react";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

const MuteControl = () => {
  const control = useControlStore(
    ({ isAudioMuted, toggleAudio, audioError }) => ({
      isAudioMuted,
      toggleAudio,
      audioError,
    })
  );

  const onClick = async () => {
    await control.toggleAudio();
  };

  const permissionError =
    control.audioError === AudioErrorState.PERMISSION_DENIED;

  return (
    <div
      className="tooltip tooltip-top"
      data-tip={
        permissionError ? "Please allow microphone permission" : undefined
      }
    >
      <button
        className={cn("btn-circle btn", {
          "btn-primary": !permissionError && !control?.isAudioMuted,
          "btn-secondary": !permissionError && control?.isAudioMuted,
          "btn-disabled": permissionError,
        })}
        onClick={() => void onClick()}
      >
        {control?.isAudioMuted ? (
          <BiMicrophoneOff className="text-2xl" />
        ) : (
          <BiMicrophone className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default MuteControl;
