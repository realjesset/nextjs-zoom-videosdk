import React from "react";

import useSesssionStore from "@/stores/session";
import cn from "@/utils/cn";
import { useRouter } from "next/router";
import { BiPhone } from "react-icons/bi";

const HangupControl = () => {
  const router = useRouter();
  const leave = useSesssionStore((s) => s.leave);

  const onClick = async () => {
    await router.push("/");
    await leave();
  };

  return (
    <div>
      <button
        className={cn("btn-error btn-circle btn")}
        onClick={() => void onClick()}
      >
        <BiPhone className="text-2xl" />
      </button>
    </div>
  );
};

export default HangupControl;
