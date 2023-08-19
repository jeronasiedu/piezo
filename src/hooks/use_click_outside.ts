'use client'
import {RefObject, useEffect} from "react"

type EventType = MouseEvent | TouchEvent

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: EventType) => void,
    ignoreClasses: string[] = []
) {
    useEffect(() => {
        const listener = (event: EventType) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node) || ignoreClasses.some((className) => event.target instanceof HTMLElement && event.target.classList.contains(className))) {
                return
            }
            handler(event)
        }

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}
