import Alert from "@/Components/Alert"
import { Link, usePage } from "@inertiajs/react"
import ValueCard from './Settings/ValueCard'
import FormPassword from "./Settings/FormPassword"
import FormEmail from "./Settings/FormEmail"

import FingerPrint from "../../../../assets/img/icons/fingerprint.svg"

export default function FrameSettings() {

    let user = usePage().props.auth.user
    let TwoFA = usePage().props.auth.TwoFA
    
    return (
        <>
            {TwoFA === true && (
                <div className="settings">
                    {TwoFA == false && 
                        <Alert state="infos"><span>Tu peux activer la double authentification en allant <Link href={route('2fa.register')}>ici</Link></span></Alert>
                    }
                    <div className="data_personnal">
                        <span className="title">Informations Personnelles</span>
                        <FormEmail />
                        <FormPassword />
                        <ValueCard title={"Double Authentification"} icon={FingerPrint} href={route((TwoFA) ? '2fa.index' : '2fa.register')} value={(TwoFA) ? "Activée" : "Désactivée"} />
                    </div>
                </div>
            )}
        </>
    )

}