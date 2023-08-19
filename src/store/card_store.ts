import {create} from "zustand";
import {CardProps} from "../components/card.tsx";

type ModalState = {
    isOpen: boolean
    open: (data: CardState) => void
    close: () => void
    data?: CardState
}
type CardState = {
    props: CardProps
}

export const useCardModalStore = create<ModalState>((set) => ({
    isOpen: false,
    open: (data) => {
        document.body.style.overflow = "hidden"
        set({isOpen: true, data})
    },
    close: () => {
        document.body.style.overflow = "auto"
        set({isOpen: false, data: undefined})
    },
}))
