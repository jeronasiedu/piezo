import ModalWrapper from "./modal_wrapper.tsx";
import {CgClose} from "react-icons/cg";
import {useCardModalStore} from "../store/card_store.ts";
import ChartComponent from "./chart_component.tsx";

const CardModal = () => {
    const {closeModal, data} = useCardModalStore((state) => ({
        closeModal: state.close,
        data: state.data,
    }))

    return (
        <ModalWrapper>
            <div className={'mb-6 flex items-center justify-between'}>
                <h3 className={'text-xl'}><span className={'capitalize'}>{data?.props.title}</span> Rate</h3>
                <button className={'icon_button'}
                        onClick={closeModal}
                >
                    <CgClose/>
                </button>
            </div>
            <ChartComponent cardProps={{
                title: data?.props.title || "current",
                unit: data?.props.unit || "AMP",
                data: data?.props.data || []
            }}/>
        </ModalWrapper>
    );
};

export default CardModal;
