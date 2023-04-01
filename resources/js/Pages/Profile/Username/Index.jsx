import React, { useState } from "react"
import Layout from "@/Layouts/Layout"
import { Link, Head, useForm } from '@inertiajs/react'
import Alert from "@/Components/Alert"
import TextInput from '@/Components/TextInput'
import InputLabel from "@/Components/InputLabel"

export default function UsernameIndex(props) {

    const title = "Changement de pseudo"
    const aCAC = props.aCAC

    const { data, setData, post, processing, errors } = useForm({
        username: props.auth.user.name,
        _token: props.csrf_token
    })

    async function submitUsername(e) {
        e.preventDefault()
        post(route('profile.username.handle'));
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col gap-6">
                <Alert state="infos">
                    <>
                        Votre pseudo doit respecter le règlement et doit être disponible.
                        <br />Veuillez noter que votre stuff ainsi que l'intégralité de vos données ne seront pas perdus.
                        <br />Vous ne pourez changer de pseudo que 30 jours après le dernier changement.
                    </>
                </Alert>
                {aCAC.result &&
                    <Alert state="error">
                        Impossible de changer de pseudo, la dernière modification ({aCAC.date}) date d'il y a moins de {aCAC.diff} jours.
                    </Alert>
                }
                <form onSubmit={submitUsername}>
                    <div className="form-group w-full">
                        <label>Votre nouveau pseudo</label>
                        <input
                            type="text"
                            placeholder={props.auth.user.name}
                            value={data.username}
                            onChange={(e) => { setData('username', e.target.value) }} 
                            disabled={aCAC.result || processing}
                        />
                    </div>
                    <button className="btn mt-6" disabled={aCAC.result || processing} type="submit">Continuer</button>
                </form>
            </div>
        </Layout>
    )


}