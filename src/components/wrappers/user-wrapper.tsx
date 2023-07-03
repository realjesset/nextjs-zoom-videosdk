import useUserStore from "@/stores/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UserWrapper = () => {
  const { createUserId, userId, username } = useUserStore(
    ({ setUsername: _, ...s }) => s
  );
  const router = useRouter();
  useEffect(() => {
    // create a userId for internal use
    if (!userId) createUserId();
    // if username is undefined, navigate to /login
    if (!username) void router.push("/login");
  }, [createUserId, router, userId, username]);

  return <></>;
};

export default UserWrapper;
