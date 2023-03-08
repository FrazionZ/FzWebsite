import React, { useState } from "react"
import Layout from "@/Layouts/Layout"
import { Link, Head } from '@inertiajs/react'
import Alert from "@/Components/Alert"
import ReactSkinview3d from 'react-skinview3d'
import Language from "@/Components/Language";
import { motion, AnimatePresence } from "framer-motion";

import BubbleInfos from '../../../assets/img/icons/bubble_infos.svg'
import Coins from '../../../assets/img/icons/coins.svg'
import Money from '../../../assets/img/icons/money.svg'
import Faction from '../../../assets/img/icons/faction.svg'
import Cogs from '../../../assets/img/icons/cogs.svg'

import MenuInventory from '../../../assets/img/icons/profile/inventory.jsx'
import MenuAppareance from '../../../assets/img/icons/profile/appareance.jsx'
import MenuSkills from '../../../assets/img/icons/profile/skills.jsx'
import MenuFaction from '../../../assets/img/icons/profile/factions.jsx'
import MenuSuccess from '../../../assets/img/icons/profile/success.jsx'
import MenuSettings from '../../../assets/img/icons/profile/settings.jsx'

import FrameInventory from './Frame/Inventory'
import FrameAppareance from './Frame/Appareance'
import FrameSettings from './Frame/Settings'

import { FaDiscord } from "react-icons/fa"

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
import FzToast from "@/Components/FzToast"
moment.locale('fr')

import { WalkingAnimation } from 'skinview3d'

export default function ProfileIndex(props) {

    const menu = [
        {
            icon: <MenuInventory className="icon" />,
            display: "Inventaire",
            component: <FrameInventory />
        },
        {
            icon: <MenuAppareance className="icon" />,
            display: "Apparence",
            component: <FrameAppareance />
        },
        {
            icon: <MenuSkills className="icon" />,
            display: "Skills",
            component: null
        },
        {
            icon: <MenuFaction className="icon" />,
            display: "Faction",
            component: null
        },
        {
            icon: <MenuSuccess className="icon" />,
            display: "Succès",
            component: null
        },
        {
            icon: <MenuSettings className="icon" />,
            display: "Paramètres",
            component: <FrameSettings />
        }
    ]
    const [playerObjectRotateY, setPlayerObjectRotateY] = useState(31.7)
    const [menuItemActive, setMenuItemActive] = useState((props.fastMenu !== null) ? props.fastMenu : 0)

    let title = "Profil"
    let status = props.status
    let mustVerifyEmail = props.mustVerifyEmail
    let TwoFA = props.auth.TwoFA
    let lang = new Language(props.language);
    let user = props.auth.user
    let factionUser = props.factionProfile
    let capeData = props.capeData

    console.log(capeData)

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col gap-[60px]">
                {TwoFA === false && (
                    <div className="alert infos w-full"><span>Tu peux activer la double authentification en allant <Link href="/2fa/register">ici</Link></span></div>
                )}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="flex justify-between items-center gap-[60px]">
                        <Alert state="warning">Tu dois valider ton adresse mail pour pouvoir jouer !</Alert>
                        <Link href={route('verification.send')} data={{ _token: props.csrf_token }} method="post" as="button" className="btn">Renvoyer un email</Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="profile">
                <div className="top">
                    <ReactSkinview3d
                        skinUrl={`https://api.frazionz.net/user/${user.id}/skin/display`}
                        capeUrl={`https://api.frazionz.net/capes/display/brut/${capeData.cape_id}`}
                        width="262"
                        height="442"
                        onReady={(ready) => {
                            ready.viewer.playerObject.rotation.y = playerObjectRotateY;
                            ready.viewer.controls.enableRotate = true;
                            ready.viewer.controls.enableZoom = false;
                            ready.viewer.controls.enablePan = false;
                            ready.viewer.animation = new WalkingAnimation();
                        }}
                    />
                    <div className="infos">
                        <div className="icon_title">
                            <img src={BubbleInfos} alt="" />
                            <span>Mes Informations</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="card">
                                <img src={`https://api.frazionz.net/user/${user.id}/skin/head?s=32`} alt="avatar" />
                                {user.name}
                            </div>
                            <div className="card">
                                <FaDiscord fill={"var(--discord)"} />
                                Data Discord Error Get
                            </div>
                            <div className="card">
                                <img src={Coins} alt="coins" />
                                <div className="value">{factionUser?.money} <span className="text-[var(--text-inactive)]">Coins</span></div>
                            </div>
                            <div className="card">
                                <img src={Money} alt="money" />
                                <div className="value">{user.money} <span className="text-[var(--text-inactive)]">Points boutique</span></div>
                            </div>
                            <div className="card">
                                <img src={Faction} alt="faction" />
                                Aucune faction définis
                            </div>
                            <div className="card">
                                <img src={Cogs} alt="cogs" />
                                Créé le {lang.replaceMonth(moment(user.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="frame">
                    <div className="menu">
                        <div className="items">
                            <span className="title">Autres pages</span>
                            {menu.map((item, index) => {
                                return (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.87 }}
                                        onClick={() => { setMenuItemActive(index) }}
                                        className={`item ${(index == menuItemActive) ? "active" : ""}`}
                                        >
                                        {item.icon} {item.display}
                                    </motion.button>
                                   
                                )
                            })}
                        </div>
                    </div>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={menuItemActive ? menuItemActive.component : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="component"
                        >  
                            {menu[menuItemActive].component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    )

}