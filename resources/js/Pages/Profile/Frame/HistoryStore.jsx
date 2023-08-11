import React, { useState } from 'react'
import { usePage } from '@inertiajs/react'

import Language from "@/Components/Language";
import moment from 'moment-timezone'
import 'moment/locale/fr'
moment.locale('fr')

export default function FrameHitoryStore() {

    const props = usePage().props

    const storeArticles = props.storeArticles
    const storeCredits = props.storeCredits
    const lang = new Language(props.language);

    console.log(storeCredits)

    return (
        <div className="history_store">
            <div className="flex flex-col gap-3">
                <span className="title">Achats d'articles</span>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" >
                                Nom de l'article
                            </th>
                            <th scope="col" >
                                Prix
                            </th>
                            <th scope="col" >
                                Origine
                            </th>
                            <th scope="col" >
                                Acheté le
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeArticles.data.map((sa, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 text-base font-medium whitespace-nowrap">{sa.item.name}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>{sa.price} {sa.payment}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>{sa.origin}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>
                                        {lang.replaceMonth(moment(sa.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3">
                <span className="title">Achats de crédits points boutique</span>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" >
                                Prix
                            </th>
                            <th scope="col" >
                                Email
                            </th>
                            <th scope="col" >
                                Type
                            </th>
                            <th scope="col" >
                                Acheté le
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeCredits.data.map((ca, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 text-base font-medium whitespace-nowrap">{ca.amount} {ca.currency}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>{ca.payer_email == undefined ? "N/A" : ca.payer_email}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>{ca.offer.type.name}</td>
                                    <td className={`px-6 text-base font-medium whitespace-nowrap`}>
                                        {lang.replaceMonth(moment(ca.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )

}