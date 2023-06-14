import useSesssionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { api } from "@/utils/api";
import cn from "@/utils/cn";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { type SessionStatusType } from "prisma/generated/zod.ts";

import { AiOutlineDelete } from "react-icons/ai";

const Home: NextPage = () => {
  const userId = useUserStore((s) => s.userId);
  const { data: sessions, refetch } = api.session.list.useQuery();
  const { mutate: startSession } = api.session.start.useMutation();
  const { mutate: deleteSession } = api.session.delete.useMutation();

  const isStarted = (session: SessionStatusType) => {
    return session === "STARTED";
  };
  return (
    <>
      <Head>
        <title>Zoom VideoSDK</title>
      </Head>

      <div className="flex flex-col space-y-4 pb-10">
        <h2 className="text-2xl font-bold">Sessions</h2>
        {sessions?.data &&
          sessions.data.map((session) => (
            <div
              key={session.id}
              className="flex w-full select-none gap-1 bg-base-200/40 shadow-xl"
            >
              <div className="card-body">
                <div
                  className={cn(
                    "badge badge-outline",
                    isStarted(session.state) ? "badge-primary" : "badge-warning"
                  )}
                >
                  scheduled session
                </div>
                <h3 className="text-lg font-semibold">
                  {session.name || session.id}
                  <span className="text-base font-normal text-base-content/80">
                    {" "}
                    by {session.hostname}
                  </span>
                </h3>
                <p className="font-extralight text-base-content/70">
                  created at {session.createdAt.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 self-center pr-6">
                <Link
                  href={`/session/${session.id}`}
                  onClick={() => {
                    if (isStarted(session.state) || session.hostId !== userId)
                      return;
                    startSession({ id: session.id, userId });
                  }}
                  className={cn(
                    "btn",
                    !isStarted(session.state) && session.hostId !== userId
                      ? "btn-disabled"
                      : "btn-primary"
                  )}
                >
                  {session.hostId === userId && !isStarted(session.state)
                    ? "Start Session"
                    : "Join Now"}
                </Link>
                {session.hostId === userId && (
                  <button
                    className="btn-error btn-outline btn self-center text-xl"
                    onClick={() =>
                      deleteSession(
                        { id: session.id },
                        { onSuccess: () => void refetch() }
                      )
                    }
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        {sessions?.data?.length === 0 && (
          <div className="grid h-[80vh] place-items-center bg-base-200/40 shadow-xl">
            <h3 className="text-2xl font-semibold">No sessions found</h3>
          </div>
        )}
        <p className="ml-auto">
          want to create a new session?{" "}
          <Link href="/session/create" className="link-primary link">
            click here.
          </Link>
        </p>
      </div>
    </>
  );
};

export default Home;
