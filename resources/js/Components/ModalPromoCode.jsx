import React from 'react'
import Modal from 'react-modal';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';

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

export default function ModalPromoCode() {

    const props = usePage().props
    const [open, setOpen] = React.useState(false)
    const modalTitle = "Utiliser un code promo";

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
                setOpen(false)
                setData('code', '')
                router.reload()
            },
            onSuccess: (data) => { },
            onError: (data) => { },
        });
    }

    return (
        <>
            <a className="cursor-pointer" onClick={() => { setOpen(true) }}>
                <motion.li variants={itemVariants}>Utiliser un code promo</motion.li>
            </a>
            <Modal
                isOpen={open}
                onRequestClose={() => { setOpen(false) }}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
                ariaHideApp={true}
                contentLabel="Modal Promo Code"
                bodyOpenClassName='w-full'
            >
                <h2 className='text-3xl'>{modalTitle}</h2>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div className="form-group">
                        <label className="text-lg">Code</label>
                        <input type="text" disabled={processing} value={data.code} onChange={(e) => { setData('code', e.target.value) }} />
                    </div>
                    <button className='btn' disabled={processing} type='submit'>Utiliser</button>
                </form>
            </Modal>
        </>

    )
}