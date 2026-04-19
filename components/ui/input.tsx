import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-none border border-[rgba(245,245,245,0.1)] bg-[rgba(11,11,11,0.5)] px-3 py-2 text-sm text-[#f5f5f5] ring-offset-[#0b0b0b] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[rgba(245,245,245,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-50 font-ui transition-colors normal-case",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
