import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">{children}</h2>
  )
}
