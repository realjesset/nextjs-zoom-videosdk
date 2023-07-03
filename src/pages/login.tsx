import useUserStore from "@/stores/user";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const { username, setUsername } = useUserStore();
  const [_username, _setUsername] = React.useState<string>(username || "");
  const router = useRouter();
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-96 space-y-4">
        <input
          className="input-primary input w-full"
          placeholder="Type your username"
          value={_username}
          onChange={(e) => _setUsername(e.target.value)}
        />
        <button
          className="btn-primary btn w-full px-4 py-2"
          onClick={() => {
            setUsername(_username);
            void router.push("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
