import React, { createElement } from 'react'
import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import axios from 'axios'
import FzToast from './FzToast'
import Modal from 'react-modal';
import { Spinner } from 'flowbite-react'

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

export default function ModalConfirmPassword({ withEmailCode, iconButton, labelButton, classNameBtn, title, onConfirm, children }) {
    const [open, setOpen] = React.useState(false)
    const [password, setPassword] = useState()
    const defaultTitle = "Confirmation du mot de passe";
    const defaultLabel = "Mot de passe";
    const [stateTitle, setStateTitle] = useState(defaultTitle)
    const [stateLabel, setStateLabel] = useState(defaultLabel)
    const [sendingMailProgress, setSendinMailProgress] = useState(false)
    const props = usePage().props
    const [formDisabled, setFormDisabled] = useState(false)
    const [forceFormDisabled, setForceFormDisabled] = useState(false)
    const [demandCode, setDemandCode] = useState(false)

    async function confirmPassword() {
        setFormDisabled(true)
        setForceFormDisabled(true)
        axios.post(route('frazion.password.confirm'), {
            password: password,
            _token: props.csrf_token
        })
            .then((res) => {
                const data = res.data
                if (data?.state == "error"){
                    FzToast.error(data?.msg)
                    setForceFormDisabled(false)
                }else if (data?.state == "success") {
                    sendCodeMail()
                }
                setFormDisabled(false)
            })
            .catch((err) => {
                setFormDisabled(false)
                setForceFormDisabled(false)
            })
    }

    async function sendCodeMail() {
        setSendinMailProgress(true)
        router.post(route('frazion.mail.send'), {
            _token: props.csrf_token
        }, {
            onSuccess: () => {
                setSendinMailProgress(false)
                setPassword("")
                setDemandCode(true)
                setFormDisabled(false)
                if (withEmailCode) {
                    setStateTitle("Confirmer le code d'idendification")
                    setStateLabel("Code à 12 caractères")
                } else {
                    setOpen(false)
                    onConfirm()
                }
            }
        })
    }

    async function confirmCodeMail() {
        setFormDisabled(true)
        setForceFormDisabled(true)
        axios.post(route('frazion.email.confirm'), {
            password: password,
            _token: props.csrf_token
        })
            .then((res) => {
                const data = res.data
                if (data?.state == "error")
                    FzToast.error(data?.msg)
                else if (data?.state == "success") {
                    FzToast.success(data?.msg)
                    setPassword("")
                    setDemandCode(false)
                    setStateTitle(defaultTitle)
                    setStateLabel(defaultLabel)
                    setOpen(false)
                    onConfirm()
                }
                setFormDisabled(false)
            })
            .catch((err) => {
                setFormDisabled(false)
                setForceFormDisabled(false)
            })
    }

    return (
        <>
            <button onClick={() => { setOpen(true) }} className={`btn ${classNameBtn}`}>
                {iconButton} {labelButton}
            </button>
            <Modal
                isOpen={open}
                onRequestClose={() => { setOpen(false) }}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
                bodyOpenClassName='w-full'
            >
                {!sendingMailProgress &&
                    <h2 className='text-3xl'>{stateTitle}</h2>
                }
                {demandCode &&
                    <span className='my-3 block'>Un email contenant un code temporaire vient d'être envoyer à l'adresse mail de votre profil.<br />Veuillez le consulter et indiquer ci-dessous le code reçus.<br /><em>Pensez à aller dans votre boîte spam</em></span>
                }
                {sendingMailProgress &&
                    <div className="flex gap-4 justify-center items-center my-8">
                        <Spinner size="xl" aria-label="Center-aligned spinner example" /> <span className='text-xl'>Envoie du mail de confirmation..</span>
                    </div>
                }
                {!sendingMailProgress &&
                    <div className="form-group">
                        <label className="text-lg">{stateLabel}</label>
                        <input type="password" disabled={formDisabled} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                }
                {!sendingMailProgress &&
                    <div className="flex justify-end gap-6">
                        <button className='btn' disabled={forceFormDisabled} onClick={() => setOpen(false)}>Annuler</button>
                        <button onClick={demandCode ? confirmCodeMail : confirmPassword} disabled={formDisabled} className='btn'>Confirmer</button>
                    </div>
                }
            </Modal>
        </>

    )
}