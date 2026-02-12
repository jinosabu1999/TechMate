"use client"

import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:w-[420px]">
      {toasts.map(function ({ id, description, variant }) {
        return (
          <div
            key={id}
            className="mb-2 flex w-full items-center justify-between rounded-lg border border-border bg-secondary p-4 text-sm text-foreground shadow-lg animate-in slide-in-from-right-full duration-200"
          >
            <div>{description}</div>
          </div>
        )
      })}
    </div>
  )
}
