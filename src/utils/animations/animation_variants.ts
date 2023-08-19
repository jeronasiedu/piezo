import {Variants} from "framer-motion";

export const menuVariant: Variants = {
    initial: {
        opacity: 0,
        y: 10
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
        }
    },
    exit: {
        opacity: 0,
        y: 10,

    },

}
export const menuItemVariant: Variants = {
    initial: {
        opacity: 0,
        y: -2
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: 2
    }
}

export const backdropVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};
export const modalVariant = {
    initial: {
        opacity: 0,
        y: 5,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 5,
    },
};
