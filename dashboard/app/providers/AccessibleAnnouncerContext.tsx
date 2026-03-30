'use client'

import { createContext, type PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'

interface AccessibleAnnouncerContextType {
  announce: (message: string, clearAfter?: number) => void
}

const AccessibleAnnouncerContext = createContext<AccessibleAnnouncerContextType | undefined>(undefined)

/**
 * Provides a shared accessible announcer for screen reader live region announcements.
 *
 * Renders two visually hidden `aria-live="polite"` regions that alternate on each call
 * to `announce()`. The dual-region approach ensures screen readers re-announce even when
 * the same message is sent consecutively (since the DOM always changes).
 *
 * Messages are automatically cleared after a configurable timer (default 2000ms).
 * Each new announcement resets the timer — only the latest message is active.
 *
 * Wrap this provider at the layout level and consume via the `useAnnounce` hook.
 *
 * @example
 * ```tsx
 * // In layout
 * <AccessibleAnnouncerProvider>{children}</AccessibleAnnouncerProvider>
 *
 * // In a client component
 * const { announce } = useAnnounce()
 * announce('Focus has been changed to the selected heading')       // clears after 2000ms
 * announce('Error occurred', 5000)       // clears after 5000ms
 * ```
 */
export function AccessibleAnnouncerProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<[string, string]>(['', ''])
  const currentSlot = useRef(0)
  const clearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Sends a message to the screen reader via the shared `aria-live` region.
   * Replaces any previous message and resets the auto-clear timer.
   *
   * @param message - The text to announce.
   * @param clearAfter - Time in ms before the region is cleared. Defaults to 2000.
   */
  const announce = (message: string, clearAfter = 2000) => {
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current)
    }

    const nextSlot = currentSlot.current === 0 ? 1 : 0
    currentSlot.current = nextSlot

    setMessages(() => {
      const next: [string, string] = ['', '']
      next[nextSlot] = message
      return next
    })

    clearTimeoutRef.current = setTimeout(() => {
      setMessages(['', ''])
    }, clearAfter)
  }

  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current)
      }
    }
  }, [])

  return (
    <AccessibleAnnouncerContext.Provider value={{ announce }}>
      {children}
      <div className="sr-only" role="status" aria-live='polite' aria-atomic="true">{messages[0]}</div>
      <div className="sr-only" role="status" aria-live='polite' aria-atomic="true">{messages[1]}</div>
    </AccessibleAnnouncerContext.Provider>
  )
}

/**
 * Returns the `announce` function from the nearest `AccessibleAnnouncerProvider`.
 *
 * @throws If called outside of an `AccessibleAnnouncerProvider`.
 */
export function useAnnounce() {
  const context = useContext(AccessibleAnnouncerContext)
  if (context === undefined) {
    throw new Error('useAnnounce must be used within an AccessibleAnnouncerProvider')
  }
  return context
}
