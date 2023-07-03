import cn from "@/utils/cn";
import { Toaster as IToaster, ToastBar } from "react-hot-toast";

const Toaster = () => (
  <IToaster
    toastOptions={{
      success: {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      error: {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t} style={{ padding: 0, background: "transparent" }}>
        {({ icon, message }) => (
          <div
            className={cn("alert", {
              "alert-success": t.type === "success",
              "alert-error": t.type === "error",
            })}
          >
            {icon}
            {message}
          </div>
        )}
      </ToastBar>
    )}
  </IToaster>
);

export default Toaster;
