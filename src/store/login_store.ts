import {create} from "zustand";

type ModalState = {
    isOpen: boolean
    open: () => void
    close: () => void
}


export const useLoginModalStore = create<ModalState>((set) => ({
    isOpen: false,
    open: () => {
        document.body.style.overflow = "hidden"
        set({isOpen: true})
    },
    close: () => {
        document.body.style.overflow = "auto"
        set({isOpen: false})
    },
}))
export const useRegisterModalStore = create<ModalState>((set) => ({
    isOpen: false,
    open: () => {
        document.body.style.overflow = "hidden"
        set({isOpen: true})
    },
    close: () => {
        document.body.style.overflow = "auto"
        set({isOpen: false})
    },
}))

