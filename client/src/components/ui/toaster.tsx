import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { CircleCheck, CircleX } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const Icon =
          variant === "destructive" ? CircleX : CircleCheck;

        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2">
              <Icon className={`${variant === "destructive" ? 'text-red-600' : 'text-blue-700'} h-5 w-5 mt-1`} />
              <div className="gap-2 mt-1">
                {title && <ToastTitle className={`${variant === "destructive" ? 'text-red-600' : 'text-blue-700'}`}>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
