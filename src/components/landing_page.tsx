import ReactTyped from "react-typed";
import {Login} from "react-iconly";
import {useLoginModalStore} from "../store/login_store.ts";
import {RiAppsLine, RiPulseLine} from "react-icons/ri";
import {BsGraphUp} from "react-icons/bs";
import {BiCodeAlt} from "react-icons/bi";

const LandingPage = () => {
    const {openLoginModal} = useLoginModalStore((state) => ({
        openLoginModal: state.open,
    }))
    return (
        <main className={'max-w-6xl mx-auto pt-24'}>
            <div className={' text-center'}>
                <h1 className={'text-xl md:text-4xl font-semibold mb-8 uppercase'}>
                    Welcome to{" "}
                    <span className={'text-blue-500'}><ReactTyped smartBackspace strings={["our project work"]} typeSpeed={130} loop/></span>
                </h1>
                <div className={'max-w-4xl mx-auto p-2'}>
                    <p className={'mb-8'}>Detect Vibrations and Mechanical Phenomena with our</p>
                    <ul className={' grid grid-cols-2 gap-4 text-sm md:text-base  mx-auto md:grid-cols-4'}>
                        <li className={'bg-white shadow-sm p-3  border rounded-lg flex items-center justify-center flex-col h-28'}>
                            <span className={'text-xl text-blue-500 mb-2'}><RiPulseLine/></span>
                            <span
                                className={'text-transparent mr-1 bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'}>Highly sensitive</span>
                            <span>piezoelectric sensors</span>
                        </li>
                        <li className={'bg-white shadow-sm p-3  border rounded-lg flex items-center justify-center flex-col h-28'}>
                            <span className={'text-xl text-blue-500 mb-2'}><BsGraphUp/></span>
                            <span
                                className={'text-transparent mr-1 bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'}>Real-time</span>
                            <span>data visualization</span>
                        </li>
                        <li className={'bg-white shadow-sm p-3  border rounded-lg flex items-center justify-center flex-col h-28'}>
                            <span className={'text-xl text-blue-500 mb-2'}><RiAppsLine/></span>
                            <span>Wide range of</span>
                            <span
                                className={'text-transparent mr-1 bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'}>
                                applications
                            </span>

                        </li>
                        <li className={'bg-white shadow-sm p-3  border rounded-lg flex items-center justify-center flex-col h-28'}>
                            <span className={'text-xl text-blue-500 mb-2'}><BiCodeAlt/></span>
                            <span
                                className={'text-transparent mr-1 bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'}>
                                Easy to use
                            </span>
                            <span>and integrate</span>
                        </li>
                    </ul>
                    <button className={'btn_primary mt-8 mx-auto w-44'}
                            onClick={openLoginModal}
                    ><Login set="bulk" size={'small'}/> See it in action
                    </button>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;
