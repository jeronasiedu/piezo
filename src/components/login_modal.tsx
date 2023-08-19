import {CgClose} from "react-icons/cg";
import React, {useState} from "react";
import {Hide, Show} from "react-iconly";
import toast from "react-hot-toast";
import {useLoginModalStore} from "../store/login_store.ts";
import ModalWrapper from "./modal_wrapper.tsx";
import Spinner from "./spinner.tsx";
import {useAuth} from "../providers/auth_provider.tsx";
import {formatFirebaseError} from "../utils/format_firebase_errors.ts";


function LoginModal() {
    const {closeModal} = useLoginModalStore((state) => ({
        closeModal: state.close,
    }))
    const {login} = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toggleShowPassword = () => setShowPassword(!showPassword)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!navigator.onLine) {
            return toast.error("You are offline")
        }
        try {
            setLoading(true)
            await login(email, password)
            closeModal()
            toast.success("Logged in successfully")
            setLoading(false)
            closeModal()

        } catch (e: any) {
            setLoading(false)
            toast.error(formatFirebaseError(e.code))
            console.log(e.code)
        }
    }


    return <ModalWrapper>
        <div>
            <div className={'mb-6 flex items-center justify-between'}>
                <h3 className={'text-xl'}>Welcome back!</h3>
                <button className={'icon_button'}
                        onClick={closeModal}
                >
                    <CgClose/>
                </button>
            </div>
            <form className={'space-y-4'} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className={''}>Email</label>
                    <input type={'email'} id={'email'} required className={'text_field w-full'} placeholder={"Your email"}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={'relative'}>
                    <label htmlFor="password" className={''}>Password</label>
                    <input type={showPassword ? "text" : "password"} id={'password'} required className={'text_field pr-12 w-full'}
                           placeholder={"Your password"}
                           value={password}
                           minLength={8}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={'icon_button p-1.5 absolute right-1 top-[1.9rem] '}
                            onClick={toggleShowPassword}
                            type={'button'}
                    >
                        {showPassword ? <Hide size={'small'} set={'bulk'}/> :
                            <Show size={'small'}/>}
                    </button>
                </div>
                <button
                    disabled={loading}
                    className={'btn_primary w-full'}>
                    {loading ? <Spinner/> : "Login"}
                </button>
            </form>
        </div>
    </ModalWrapper>
}

export default LoginModal
