import Navbar from "@/components/navbar";
import Toaster from "@/components/toaster";
import UserWrapper from "@/components/wrappers/user-wrapper";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import { type AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="overflow-x-hidden px-2 md:container">
      <UserWrapper />
      {/* <Navbar /> */}
      <div className="my-4">
        <Component {...pageProps} />
      </div>
      <Toaster />
    </main>
  );
};

export default api.withTRPC(MyApp);
