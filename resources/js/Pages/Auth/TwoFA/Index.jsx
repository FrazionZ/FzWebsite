import Alert from "@/Components/Alert"
import ModalConfirmPassword from "@/Components/ModalConfirmPassword";
import Layout from "@/Layouts/Layout"
import { Head, router } from "@inertiajs/react"
import React, { useState } from "react"
import ReactDOM from 'react-dom';
import { FaDownload } from "react-icons/fa";
import Modal from 'react-modal';

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
    },
};

export default function Index(props) {

    console.log(props.auth.user)

    const title = "Authentification à deux facteurs"
    const [codes, setCodes] = useState(JSON.parse(props.twoFactorRecoveryCodes))
    const [disabledAllForm, setDisabledAllForm] = useState(false)

    async function submitRegenerate(e) {
        e.preventDefault()
        setDisabledAllForm(true)
        router.post(route('2fa.regenerate'), {
            _token: props.csrf_token
        }, {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
                setDisabledAllForm(false)
            },
            onSuccess: (data) => {
                setCodes(JSON.parse(data.props.auth.user.two_factor_recovery_codes))
            },
        })
    }

    async function submitDisable(e) {
        e.preventDefault()
        router.post(route('2fa.disable'), {
            _token: props.csrf_token
        })
    }

    function exportCodesTwoFA() {
        let codesString = "==========================================\nFrazionZ - Codes de secours - Usage unique\n==========================================\n \n"
        for (const code of codes) {
            codesString += code + " \n"
        }
        const link = document.createElement("a");
        link.download = "frazionz-code-2fa-secours.txt";
        link.href = URL.createObjectURL(new Blob([codesString], { type: "text/plain" }));
        link.click();

        FzToast.info('Téléchargement du fichier texte commencé')
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col gap-4">
                <Alert state="success">Votre 2FA est activée, vous pouvez récupérer vos codes de secours ainsi que de désactiver votre 2FA</Alert>
                <div className="flex flex-col gap-4">
                    <Alert state="infos" className="h-fit">Vos codes secrets peuvent être utilisés une seule fois, une fois utilisés, ils seront régénérés et les anciens seront invalides.</Alert>
                    <div className="button-group justify-center mt-4">
                        <ModalConfirmPassword 
                            iconButton={<FaDownload />}
                            withEmailCode={true}
                            labelButton="Télécharger en format .TXT"
                            classNameBtn="w-full"
                            onConfirm={exportCodesTwoFA}
                            />
                        <button className="btn" disabled={disabledAllForm} onClick={submitRegenerate}>Générer de nouveaux codes</button>
                        <button className="btn" disabled={disabledAllForm} onClick={submitDisable}>Désactiver la 2FA</button>
                    </div>
                </div>
            </div>
        </Layout>
    )


}