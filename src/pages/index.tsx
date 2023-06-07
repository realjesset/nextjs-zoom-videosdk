import useZoomStore from "@/stores/zoom";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { client, init } = useZoomStore();
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  useEffect(() => {
    void (async () => await init())();
  }, [init]);

  useEffect(() => {
    console.log("client", client);
  }, [client]);

  return (
    <>
      hello world
      {JSON.stringify(client, null, 2)}
    </>
  );
};

export default Home;
