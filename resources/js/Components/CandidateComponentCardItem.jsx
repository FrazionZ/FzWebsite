import { Link } from "@inertiajs/react";
import Eye from '../../assets/img/icons/eye.svg'
import EyeCrossed from '../../assets/img/icons/eye-crossed.svg'
import Settings from '../../assets/img/icons/settings.svg'
import { Tooltip } from "flowbite-react";

import Badge from "./Badge";

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function CandidateComponentCardItem({ candid }){

    function replaceMonth(str)  {
        return str.replaceAll('January', 'Janvier')
        .replaceAll('February', 'Février')
        .replaceAll('March', 'Mars')
        .replaceAll('April', 'Avril')
        .replaceAll('May', 'Mai')
        .replaceAll('June', 'Juin')
        .replaceAll('July', 'Julliet')
        .replaceAll('August', 'Août')
        .replaceAll('September', 'Septembre')
        .replaceAll('October', 'Octobre')
        .replaceAll('November', 'Novembre')
        .replaceAll('December', 'Décembre')
    }

    return (
        <div className="card candidate item">
            <div className="card-body">
                <div className="infos">
                    <div className="general">
                        <div className="username"><Tooltip content={(candid.public) ? "Public": "Non public"}><img style={{ width: "32px" }} src={(candid.public) ? Eye : EyeCrossed} alt="" /></Tooltip><span>{candid.upseudo}</span></div>
                        <span className="date">Publié le { replaceMonth(moment(candid.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY')) }</span>
                    </div>
                    <div className="tag">
                        {(candid.state == 2 && candid.substate == 1) && <Badge state="error" size="sm" message="Refusée" /> }
                        {(candid.state == 2 && candid.substate == 0) && <Badge state="success" message="Acceptée" size="sm" /> }
                    </div>
                </div>
                <div className="actions">
                    <Link className="btn" href={route('candidate.show', {id: candid.id})}>Visionner</Link>
                    <Link className="btn icon" style={{width: "95px !important"}}><img src={Settings} /></Link>
                </div>
            </div>
        </div>
    )

}