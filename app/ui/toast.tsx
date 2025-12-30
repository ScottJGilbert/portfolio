import { toast, ToastContainer, ToastContentProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom toast classes using your theme variables
const baseToastClass =
  "border-1 rounded-xl shadow-lg border border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] px-4 py-3 font-medium";
const successClass = baseToastClass + " border-green-400";
const errorClass = baseToastClass + " border-red-400";
const warningClass = baseToastClass + " border-yellow-400";

export function ToastSuccess(message: string) {
  toast.success(message, {
    position: "bottom-right",
    className: successClass,
    progressClassName: "bg-green-400",
    icon: false,
  });
}

export function ToastError(message: string) {
  toast.error(message, {
    position: "bottom-right",
    className: errorClass,
    progressClassName: "bg-red-400",
    icon: false,
  });
}

export function ToastConfirm(
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) {
  toast.warning(
    ({ closeToast }: ToastContentProps) => (
      <div className="flex flex-col gap-3">
        <p>{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              if (closeToast) closeToast();
            }}
            className="px-3 py-1 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              if (onCancel) onCancel();
              if (closeToast) closeToast();
            }}
            className="px-3 py-1 rounded-lg bg-zinc-400 text-zinc-900 font-semibold hover:bg-zinc-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      position: "bottom-right",
      autoClose: false,
      className: warningClass,
      progressClassName: "bg-yellow-400",
      icon: false,
    }
  );
}

// Place this ToastContainer at the root of your app (e.g., in _app.tsx or layout.tsx)
export function ThemedToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      toastClassName={baseToastClass}
      closeButton={false}
      hideProgressBar={false}
      theme="colored"
      draggable={false}
      newestOnTop
      autoClose={3000}
    />
  );
}
