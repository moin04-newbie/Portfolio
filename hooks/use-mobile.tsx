"use client"

import { useState, useEffect } from "react"

/**
 * Detects if the viewport is smaller than the given breakpoint (default 768 px).
 * Safe for SSR: all `window` access is guarded.
 */
export default function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // 👉 bail-out during SSR / first prerender
    if (typeof window === "undefined") return

    const handleResize = () => setIsMobile(window.innerWidth < breakpoint)

    // run once immediately
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      // guard again during unmount (React 18 strict-mode double-invoke, etc.)
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [breakpoint])

  return isMobile
}
