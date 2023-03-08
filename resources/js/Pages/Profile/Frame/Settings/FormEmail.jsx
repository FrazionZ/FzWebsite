import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import ValueCard from './ValueCard'

import Envelope from '../../../../../assets/img/icons/envelope.svg'

export default function FormEmail(props) {

    const csrf_token = usePage().props.csrf_token

    const [user, setUser] = useState(usePage().props.auth.user)

    const [email, setEmail] = useState('')
    const [emailConfirmation, setEmailConfirmation] = useState('')

    
    let emailFormat = user.email.split('@')
    let emailFormatted = emailFormat[0].slice(0, 3) + "******" + emailFormat[0].slice((emailFormat[0].length) - 3, (emailFormat[0].length)) + "@" + emailFormat[1]


    return (
        <ValueCard title={"Adresse Email"} icon={Envelope} value={emailFormatted} method="put" url={route('email.update')} data={{ email: email, email_confirmation: emailConfirmation, _token: csrf_token }}>
            <div className="form-group">
                <label>Nouvelle adresse email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Confirmer nouvelle adresse email</label>
                <input type="text" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
            </div>
        </ValueCard>
    );
}
