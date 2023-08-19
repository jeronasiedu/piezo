import React from "react";
import {motion} from "framer-motion";
import {backdropVariant, modalVariant} from "../utils/animations/animation_variants.ts";

function ModalWrapper({children}: { children: React.ReactNode }) {
    return <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backdropVariant}
        className={'modal_overlay'}
    >
        <motion.div
            variants={modalVariant}
            className={'modal_content'}
        >
            {children}
        </motion.div>
    </motion.div>
}

export default ModalWrapper
