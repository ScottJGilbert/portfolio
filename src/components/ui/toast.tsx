import { HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";
import { toast, type ToastOptions } from "react-toastify";

function ToastSuccess({ data }: { data: { title: string; message: string } }) {
  return (
    <div className="flex max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-ambient backdrop-blur supports-backdrop-filter:bg-surface/90 border-emerald-500/20 bg-emerald-500/6 text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-50">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200">
        <HiCheckCircle className="size-5" aria-hidden />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold tracking-tight">{data.title}</p>
        <p className="text-sm leading-6 text-muted">{data.message}</p>
      </div>
    </div>
  );
}

function ToastError({ data }: { data: { title: string; message: string } }) {
  return (
    <div className="flex max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-ambient backdrop-blur supports-backdrop-filter:bg-surface/90 border-rose-500/20 bg-rose-500/6 text-rose-950 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-50">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-500/12 text-rose-700 dark:bg-rose-400/15 dark:text-rose-200">
        <HiExclamationTriangle className="size-5" aria-hidden />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold tracking-tight">{data.title}</p>
        <p className="text-sm leading-6 text-muted">{data.message}</p>
      </div>
    </div>
  );
}

const toastBaseOptions: ToastOptions = {
  closeButton: false,
  icon: false,
  className: "!bg-transparent !p-0 !shadow-none !mb-3 !overflow-visible",
};

export function showToastSuccess(
  title: string,
  message: string,
  options?: ToastOptions,
) {
  return toast.success(ToastSuccess, {
    ...toastBaseOptions,
    ...options,
    data: { title, message },
  });
}

export function showToastError(
  title: string,
  message: string,
  options?: ToastOptions,
) {
  return toast.error(ToastError, {
    ...toastBaseOptions,
    ...options,
    data: { title, message },
  });
}
