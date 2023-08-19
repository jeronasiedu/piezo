import LoginModal from "./components/login_modal.tsx";
import {AnimatePresence} from "framer-motion";
import {useLoginModalStore, useRegisterModalStore} from "./store/login_store.ts";
import Navigation from "./components/navigation.tsx";
import LandingPage from "./components/landing_page.tsx";
import {useAuth} from "./providers/auth_provider.tsx";
import Dashboard from "./components/dashboard.tsx";
import RegisterModal from "./components/register_modal.tsx";
import Blobs from "./components/blobs.tsx";
import {useCardModalStore} from "./store/card_store.ts";
import CardModal from "./components/card_modal.tsx";

function App() {
    const {isLoginModalOpen} = useLoginModalStore((state) => ({
        isLoginModalOpen: state.isOpen,
    }))
    const {isRegisterModalOpen} = useRegisterModalStore((state) => ({
        isRegisterModalOpen: state.isOpen,
    }))
    const {isCardModalOpen} = useCardModalStore((state) => ({
        isCardModalOpen: state.isOpen,
    }))

    const {user} = useAuth()

    return (
        <>
            <AnimatePresence>
                {isLoginModalOpen && <LoginModal/>}
            </AnimatePresence>
            <AnimatePresence>
                {isRegisterModalOpen && <RegisterModal/>}
            </AnimatePresence>
            <AnimatePresence>
                {isCardModalOpen && <CardModal/>}
            </AnimatePresence>
            <Navigation/>
            <Blobs/>
            {user ? <Dashboard/> : <LandingPage/>}
        </>
    )
}

export default App
