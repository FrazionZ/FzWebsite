import Alert from "@/Components/Alert"
import { Link, usePage, router } from "@inertiajs/react"
import ValueCard from './Settings/ValueCard'
import FormPassword from "./Settings/FormPassword"
import FormEmail from "./Settings/FormEmail"
import Language from "@/Components/Language";

import FingerPrint from "../../../../assets/img/icons/fingerprint.svg"
import Windows from "../../../../assets/img/icons/windows.svg"
import Apple from "../../../../assets/img/icons/apple.svg"
import Ubuntu from "../../../../assets/img/icons/ubuntu.svg"
import Trash from "../../../../assets/img/icons/trash.jsx"
import { useState } from "react"

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function FrameSettings() {

    const props = usePage().props
    let user = props.auth.user
    let TwoFA = props.auth.TwoFA
    let csrf_token = props.csrf_token
    let lang = new Language(props.language);

    const [tokensUser, setTokensUser] = useState(props.tokensUser)
    const [progressTokenRevoke, setProgressTokenRevoke] = useState(false)

    const os = [
        {
            key: "Windows",
            icon: Windows
        },
        {
            key: "MacOS",
            icon: Apple
        },
        {
            key: "Ubuntu",
            icon: Ubuntu
        }
    ]

    async function tokenRevoke(token_id){
        setProgressTokenRevoke(true)
        router.post(route('profile.token.revoke'), { 
            token_id: token_id,
            _token: csrf_token
        },
        {
            preserveScroll: true,
            onSuccess: (res) => {
                setTokensUser(res.props.tokensUser)
                setProgressTokenRevoke(false)
            },
            onError: () => {
                setProgressTokenRevoke(false)
            }
        })
    }
    
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
                    <div className="flex flex-col gap-[16px]">
                        <span className="title">Sessions Actives</span>
                        {tokensUser.length <= 0 &&
                            <Alert state="infos">Aucune connexion n'est active sur votre compte FrazionZ.</Alert>
                        }
                        {tokensUser.map((token, index) => {
                            let osf = os.find(os => os.key == token.os)
                            if(osf == undefined) osf = os[0]
                            return (
                                <div key={index} className="card token">
                                    <div className="infos">
                                        <div className="column">
                                            <div className="icon">
                                                <img src={osf.icon} alt="" />
                                            </div>
                                            <div className="data">
                                                <span className="os">{token.os}</span>
                                                <span className="locate">{token.geo.city}, {token.geo.region}, {token.geo.country}</span>
                                            </div>
                                        </div>
                                        <div className="column">
                                            Mis à jour le {lang.replaceMonth(moment(token.updated_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button className="btn icon" disabled={progressTokenRevoke} onClick={() => { tokenRevoke(token.id) }}>
                                            <Trash />    
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )

}