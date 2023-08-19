import {useRef, useState} from "react";
import {FaUserTie} from "react-icons/fa";
import {AnimatePresence, motion} from "framer-motion";
import {ImExit} from "react-icons/im";
import {useLoginModalStore, useRegisterModalStore} from "../store/login_store.ts";
import {menuVariant} from "../utils/animations/animation_variants.ts";
import {Login, User} from "react-iconly";
import {useAuth} from "../providers/auth_provider.tsx";
import toast from "react-hot-toast";
import {useClickOutside} from "../hooks/use_click_outside.ts";
import {usePiezoData} from "../hooks/use_piezo_data.tsx";
import Spinner from "./spinner.tsx";


function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {openLoginModal} = useLoginModalStore((state) => ({
        openLoginModal: state.open,
    }))
    const {openRegisterModal} = useRegisterModalStore((state) => ({
        openRegisterModal: state.open,
    }))
    const [loading, setLoading] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setIsMenuOpen(false))
    const {loading: piezoLoading, batteryVoltage, batteryPercent} = usePiezoData()

    const {user, signOut} = useAuth()

    const handleSignOut = async () => {
        try {
            setLoading(true)
            await signOut()
            setLoading(false)
            setIsMenuOpen(false)
            toast.success("Catch you later, buddy")
        } catch (e) {
            console.log(e)
            toast.error("Hmm, we couldn't sign you out, please try again later")
            setLoading(false)
        }
    }


    return <nav className={`p-4  w-full`}>
        <div className={'max-w-6xl mx-auto flex items-center'}>
            <h3 className={'sm:text-lg tracking-wider uppercase'}>PIEZOELECTRIC READER</h3>
            <div className={'flex-1'}/>
            <div className={'ml-8 relative'}
                 ref={menuRef}
            >
                <button className={'btn_outline p-1.5'}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaUserTie/>
                </button>
                <AnimatePresence>
                    {isMenuOpen &&
                        <motion.div
                            variants={menuVariant}
                            initial={'initial'}
                            animate={'animate'}
                            exit={"exit"}
                            className={'absolute z-20 top-10 w-60 md:w-64 right-0 bg-white  shadow-lg rounded-lg p-2'}>
                            {user ? <>
                                <p className={'mb-2 text-sm'}>👋🏾 Hi, <span
                                    className={'font-semibold'}>{user.displayName?.split(' ')[0]}</span> Welcome</p>
                                {piezoLoading ? <div className={'p-2 flex items-center justify-center'}>
                                    <Spinner/>
                                </div> : <>
                                    <p className={'text-sm mb-3'}>Battery Percent: <span
                                        className={'font-semibold'}>{batteryPercent[batteryPercent.length - 1].value}</span></p>
                                    <p className={'text-sm mb-3'}>Battery Voltage: <span
                                        className={'font-semibold '}>{batteryVoltage[batteryVoltage.length - 1].value}</span></p>
                                </>}
                                <button className={'btn_outline w-full'} onClick={handleSignOut}><ImExit/> Sign out</button>
                            </> : <>

                                <button disabled={loading} className={'btn_primary mb-3 w-full'} onClick={() => {
                                    setIsMenuOpen(false)
                                    openLoginModal()
                                }}>
                                    <Login set="bulk" size={'small'}/> Login
                                </button>
                                <button disabled={loading} className={'btn_outline w-full'} onClick={() => {
                                    setIsMenuOpen(false)
                                    openRegisterModal()
                                }}>
                                    <User set="bulk" size={'small'}/> Signup
                                </button>
                            </>}
                        </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    </nav>
}

export default Navigation
