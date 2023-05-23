import React, { useState } from 'react'
import Modal from 'react-modal';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/img/icons/successfully-done.json";

const customStyles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(5px)",
    },
    content: {
        background: 'var(--fzbg-3)',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '12px',
        width: '50rem',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

export default function ModalPromoCode({ isMobile }) {

    const props = usePage().props
    const [open, setOpen] = React.useState(false)
    const modalTitle = "Utiliser un code promo";
    const [promoCode, setPromoCode] = useState()

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        _token: props.csrf_token,
    });

    async function submit(e) {
        e.preventDefault();
        post(route("promocode.use_code"), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
                setData('code', '')
            },
            onSuccess: (data) => {
                if (!data.props.flash.result) return;
                setPromoCode(data.props.flash.dataReset)
                document.querySelector('.promoCodeModal form').classList.add('hidden');
                document.querySelector('.promoCodeModal .apply').classList.add('open')
            },
            onError: (data) => { },
        });
    }

    document.querySelector('body').style.overflowY = open ? "hidden" : "auto"

    return (
        <>
            <a className={`${isMobile ? "nav-link" : ""} cursor-pointer`} onClick={() => { setOpen(true) }}>
                {isMobile ? "Utiliser un code promo" : <motion.li variants={itemVariants}>Utiliser un code promo</motion.li> }
            </a>
            <Modal
                isOpen={open}
                onRequestClose={() => { setOpen(false) }}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
                ariaHideApp={true}
                contentLabel="Modal Promo Code"
                bodyOpenClassName='w-full promoCodeModal'
                portalClassName='promoCodeModal'
            >
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <h2 className='title text-3xl'>{modalTitle}</h2>
                    <div className="form-group">
                        <label className="text-lg">Code</label>
                        <input type="text" disabled={processing} value={data.code} onChange={(e) => { setData('code', e.target.value) }} />
                    </div>
                    <button className='btn' disabled={processing} type='submit'>Utiliser</button>
                </form>
                <div className="apply hidden">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                    <div className="col">
                        <h2 className='text-2xl  text-center'>Vous venez de valider ce code promo avec succès</h2>
                        <h4 className='text-xl font-light text-center'>{promoCode?.give_amount} {promoCode?.type == "coins" ? "Coins" : "Points boutique"} ont été ajoutés sur votre compte.</h4>
                    </div>
                    <button className='btn mt-6' onClick={() => { setOpen(false) }}>Continuer</button>
                </div>
            </Modal>
        </>

    )
}