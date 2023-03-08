import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import ValueCard from './ValueCard'

import Lock from '../../../../../assets/img/icons/lock.svg'

export default function FormPassword(props) {

    const csrf_token = usePage().props.csrf_token

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    return (
        <ValueCard title={"Mot de passe"} icon={Lock} value="****************" method="put" url={route('password.update')} data={{ current_password: currentPassword, password: password, password_confirmation: passwordConfirmation, _token: csrf_token }}>
            <div className="form-group">
                <label>Mot de Passe Actuel</label>
                <input type="password" name="current_password" value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value)}} />
            </div>
            <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Répéter Nouveau Mot de Passe</label>
                <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>
        </ValueCard>
    );
}
